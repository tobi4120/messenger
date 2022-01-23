import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Menu from "./menu/menu";
import LoadMessages from "./messages/loadMessages";
import { getUserData } from "../API/auth";
import { Navigate } from 'react-router-dom';
import Loader from "../other/loading";
import { user, convo } from "../interfaces";
import { updateMenu } from "../../helperFunctions/menuFunctions";
import Header from "../other/header";

interface stateFields {
    isLoaded: boolean
    authenticated: boolean
    userHasConvos: boolean
    idOfMostRecentConvo: number | null
    newChat: boolean
    urlParam: string | null
}

const Home: React.FC = (props) => {
    const [state, setState] = useState<stateFields>({
        isLoaded: false,
        authenticated: false,
        userHasConvos: false,
        idOfMostRecentConvo: null,
        newChat: false,
        urlParam: null
    });

    // User state
    const [user, setUser] = useState<user>();

    // User ref
    const userRef = useRef<user | undefined>(user);
    userRef.current = user

    // Convos state
    const [convos, setConvos] = useState<convo[]>();

    // Convos ref
    const convosRef = useRef<convo[] | undefined>(convos);
    convosRef.current = convos

    // Reload messages
    const [reloadMessages, setReloadMessages] = useState<number>(0);

    // Check to see if URL is '/' or '/convo/:convoID' -- can't put this in a function for some reason
    let urlIsNot_convoID = true
    const location = useLocation();

    if (location.pathname !== "/" && location.pathname !== "/convo") urlIsNot_convoID = false

    // Web socket
    let homeSocket = useRef<any>(null);

    useEffect(() => {
        appStart();
    }, []);

    const appStart = async () => {
        // Verify user
        await checkToken();

        // Web socket
        const ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        homeSocket.current = new WebSocket(
            ws_scheme +
            '://' +
            window.location.host +
            '/ws/'
        );
       
        // Web socket -- on message
        homeSocket.current.onmessage = (e: any) => {
            const msg = JSON.parse(e.data);

            // Update state 
            if (convosRef.current) {
                
                // Existing msg
                const convoIndex = convosRef.current.findIndex((x: any) => x.id === msg.convo.id) 
                if (convoIndex > -1) {
                    updateMenu(convosRef.current, msg.convo.id, msg, setConvos)

                // New msg
                } else {
                    const userIndex = msg.convo.members.findIndex((x: any) => x.email === userRef.current?.email) 
                    
                    if (userIndex > -1) {
                        // Prepend convo to convos state
                        setConvos([msg.convo, ...convosRef.current]); 
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
                setConvos(response.data.convos);
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

    if (!state.isLoaded) return <div style={{ "height": "100vh" }}><Loader /></div>

    if (!state.authenticated || !user) return <Navigate to="/login" />

    // redirect to /conovo:convoID
    if (state.userHasConvos && urlIsNot_convoID) return <Navigate to={`/convo/${state.idOfMostRecentConvo}`} />

    return (
        <div className="home">
            <Header 
                user={user}
                setUser={setUser}
                reloadMessages={reloadMessages}
                setReloadMessages={setReloadMessages} />

            <div className="body">
                <Menu 
                    user={user}
                    convos={convos}
                    state={state}
                    setState={setState} />
                <Routes>
                    <Route 
                        path="convo/:convoId" 
                        element={ <LoadMessages 
                                        user={user} 
                                        setUser={setUser}
                                        state={state}
                                        setState={setState}
                                        homeSocket={homeSocket.current}
                                        reloadMessages={reloadMessages} />} />
                </Routes>

                {/* No chats */}
                { urlIsNot_convoID && 
                    <div className="no-convos">
                        <p className="no-convos__text">Select a chat or start a new conversation</p>
                    </div> 
                }
            </div>
        </div>
    )
};
export default Home;