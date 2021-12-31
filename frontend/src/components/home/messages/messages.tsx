import React, { useState, useEffect } from "react";
import { user, convo } from "../../interfaces";
import { useParams } from 'react-router-dom';
import { getConvo } from "../../API/messagesAPI";
import Loader from "../../other/loading";
import { Navigate } from "react-router-dom";
import Header from "../convoItemComponents/header";

interface props {
    user: user
}

interface state {
    convo: convo | null
    isLoaded: boolean
}

const Messages: React.FC<props> = (props) => {
    const { convoId } = useParams();
    const [state, setState] = useState<state>({
        convo: null,
        isLoaded: false
    })

    useEffect(() => {
        getConvoFromAPI();
    }, [])

    const getConvoFromAPI = async () => {
        if (!convoId) return

        const response = await getConvo(convoId);
        console.log(response) // REMOVE LATER
        setState({ ...state, convo: response, isLoaded: true })
    }

    if (!state.isLoaded) return <Loader />

    if (!state.convo) return <Navigate to="/" />

    return (
        <div className="messages">
            
            {/* Header */}
            <Header 
                convo={state.convo}
                user={props.user}
                headerType={"h1"} />
        </div>
    )
};
export default Messages;