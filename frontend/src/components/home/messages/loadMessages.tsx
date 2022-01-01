import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getConvo } from "../../API/messagesAPI";
import { convo, user } from "../../interfaces";
import Loader from "../../other/loading";
import { Navigate } from "react-router-dom";
import Messages from "./messages";

const LoadMessages: React.FC<{user: user}> = (props) => {
    const { convoId } = useParams();
    const [ isLoaded, setIsLoaded ] = useState<boolean>(false);
    const [ convo, setConvo ] = useState<convo | null>();

    useEffect(() => {
        getConvoFromAPI();
    }, [])

    const getConvoFromAPI = async () => {
        if (!convoId) return

        const response = await getConvo(convoId);
        setConvo(response);
        setIsLoaded(true);
    }

    if (!isLoaded) return <Loader />

    if (!convo) return <Navigate to="/" />

    return (<Messages user={props.user} convo={convo} />)
}
export default LoadMessages