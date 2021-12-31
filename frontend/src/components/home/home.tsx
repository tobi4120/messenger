import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Menu from "./menu/menu";
import Messages from "./messages/messages";
import { getUserData } from "../API/auth";
import { Navigate } from 'react-router-dom';
import Loader from "../other/loading";
import { user } from "../interfaces";

interface stateFields {
    isLoaded: boolean
    authenticated: boolean
    userHasConvos: boolean
    idOfMostRecentConvo: number | null
}

const Home: React.FC = (props) => {
    const [state, setState] = useState<stateFields>({
        isLoaded: false,
        authenticated: false,
        userHasConvos: false,
        idOfMostRecentConvo: null,
    });
    const [user, setUser] = useState<user>();
    let alsoUser = {}

    // Check to see if URL is '/' or '/convo/:convoID' -- can't put this in a function for some reason
    let urlIsNot_convoID = true
    const location = useLocation();

    if (location.pathname !== "/" && location.pathname !== "/convo") urlIsNot_convoID = false

    useEffect(() => {
        checkToken();
    }, []);

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
                alsoUser = response.data;
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
            <Menu user={user} />
            <Routes>
                <Route path="convo/:convoId" element={<Messages user={user} />} />
            </Routes>
        </div>
    )
};
export default Home;