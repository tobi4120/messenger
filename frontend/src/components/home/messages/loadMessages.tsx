import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getConvo } from "../../API/messagesAPI";
import { convo, user } from "../../interfaces";
import Loader from "../../other/loading";
import { Navigate } from "react-router-dom";
import Messages from "./messages";

const LoadMessages: React.FC<{user: user, setUser: any}> = (props) => {
    const { convoId } = useParams();
    const [ isLoaded, setIsLoaded ] = useState<boolean>(false);
    const [ convo, setConvo ] = useState<convo | null>();

    useEffect(() => {
        getConvoFromAPI();
    }, [convoId])

    const getConvoFromAPI = async () => {
        if (!convoId) return
        
        try {
            const response = await getConvo(convoId);

            // Check to see if user is a member of the convo
            let userIsInConvo = false;

            response.members.forEach(member => {
                if (member.id === props.user.id) userIsInConvo = true;
            });
            if (userIsInConvo) setConvo(response);
            
        } catch {
        }
        setIsLoaded(true);
    }

    if (!isLoaded) return <Loader />

    if (!convo) return <Navigate to="/" />

    return (<Messages 
                user={props.user} 
                convo={convo}
                setUser={props.setUser} />)
}
export default LoadMessages