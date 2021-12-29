import React, { useState, useEffect } from "react";
import Menu from "./menu/menu";
import Messages from "./messages/messages";
import { getUserData } from "../API/auth";
import { Navigate } from 'react-router-dom';
import Loader from "../other/loading";
import { user } from "../interfaces";

interface stateFields {
    isLoaded: boolean
    authenticated: boolean
}

const Home: React.FC = () => {
    const [state, setState] = useState<stateFields>({
        isLoaded: false,
        authenticated: false
    });
    const [user, setUser] = useState<user>();

    useEffect(() => {
        checkToken();
    }, []);

    // Check if there is a valid token in local storage
    const checkToken = async () => {
        const token = localStorage.getItem("token")

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

            setState({ ...state, isLoaded: true, authenticated: true });
        } catch {
            setState({ ...state, isLoaded: true });
        };
    };

    if (!state.isLoaded) return <Loader />

    if (!state.authenticated || !user) return <Navigate to="/login" />

    return (
        <div className="home">
            <Menu user={user} />
            <Messages />
        </div>
    )
};
export default Home;