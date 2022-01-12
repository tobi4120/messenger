import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Menu from "./menu/menu";
import LoadMessages from "./messages/loadMessages";
import { getUserData } from "../API/auth";
import { Navigate } from 'react-router-dom';
import Loader from "../other/loading";
import { user } from "../interfaces";
import { updateMenu } from "../../helperFunctions/menuFunctions";

interface stateFields {
    isLoaded: boolean
    authenticated: boolean
    userHasConvos: boolean
    idOfMostRecentConvo: number | null
    newChat: boolean
}

const Home: React.FC = (props) => {
    const [state, setState] = useState<stateFields>({
        isLoaded: false,
        authenticated: false,
        userHasConvos: false,
        idOfMostRecentConvo: null,
        newChat: false
    });

    // User state
    const [user, setUser] = useState<user>();

    // User ref
    const userRef = useRef<user | undefined>(user);
    userRef.current = user

    // Check to see if URL is '/' or '/convo/:convoID' -- can't put this in a function for some reason
    let urlIsNot_convoID = true
    const location = useLocation();

    if (location.pathname !== "/" && location.pathname !== "/convo") urlIsNot_convoID = false

    // Web socket
    const ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    const homeSocket = new WebSocket(
        ws_scheme +
        '://' +
        window.location.host +
        '/ws/'
    );

    useEffect(() => {
        appStart();
    }, []);

    const appStart = async () => {
        // Verify user
        await checkToken();
       
        // Web socket -- on message
        homeSocket.onmessage = (e) => {
            const msg = JSON.parse(e.data);

            // Update state 
            if (userRef.current) {
                
                // Existing msg
                const convoIndex = userRef.current.convos.findIndex((x: any) => x.id === msg.convo.id) 
                if (convoIndex > -1) {
                    updateMenu(userRef.current, msg.convo.id, msg, setUser)

                // New msg
                } else {
                    const userIndex = msg.convo.members.findIndex((x: any) => x.email === userRef.current?.email) 
                    
                    if (userIndex > -1) {
                        // Prepend convo to user object
                        setUser({ ...userRef.current, convos: [msg.convo, ...userRef.current.convos] }); 
                    }
                }
            }
        }
    }

    // Check if there is a valid token in local storage
    const checkToken = async () => {
        const token = localStorage.getItem("token")
        let userHasConvos = false;
        let idOfMostRecentConvo = null

        if (token === null) {
            setState({ ...state, isLoaded: true })
            return;
        }

        // Check if token is valid. If not go back to login page.
        try {
            const response = await getUserData(); // Get user data

            if (response) {
                setUser(response.data);
            }

            // Check if user has any convos
            if (response.data.convos.length > 0) {
                userHasConvos = true;
                idOfMostRecentConvo = response.data.convos[0].id;
            }
            setState({ 
                ...state, 
                userHasConvos: userHasConvos, 
                idOfMostRecentConvo: idOfMostRecentConvo, 
                authenticated: true, 
                isLoaded: true });
        } catch {
            setState({ ...state, isLoaded: true });
        };
    };

    if (!state.isLoaded) return <Loader />

    if (!state.authenticated || !user) return <Navigate to="/login" />

    // redirect to /conovo:convoID
    if (state.userHasConvos && urlIsNot_convoID) return <Navigate to={`/convo/${state.idOfMostRecentConvo}`} />

    return (
        <div className="home">
            <Menu 
                user={user}
                state={state}
                setState={setState} />
            <Routes>
                <Route path="convo/:convoId" 
                       element={ <LoadMessages 
                                    user={user} 
                                    setUser={setUser}
                                    state={state}
                                    setState={setState}
                                    homeSocket={homeSocket} />} />
            </Routes>

            {/* No chats */}
            { urlIsNot_convoID && 
                <div>
                    Select a chat or start a new conversation
                </div> 
            }
        </div>
    )
};
export default Home;