import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getConvo } from "../../API/messagesAPI";
import { user } from "../../interfaces";
import Loader from "../../other/loading";
import { Navigate } from "react-router-dom";
import Messages from "./messages";
import NewConvo from "./newConvo/newConvo";

interface props {
    user: user, 
    setUser: any,
    state: any,
    setState: any
}

const LoadMessages: React.FC<props> = (props) => {
    const { convoId } = useParams();
    const [ isLoaded, setIsLoaded ] = useState<boolean>(false);
    const [ convo, setConvo ] = useState<any>();
    const [ userInConvo, setUserInConvo ] = useState<boolean>(false);

    useEffect(() => {
        setIsLoaded(false);
        getConvoFromAPI();
    }, [convoId])

    const getConvoFromAPI = async () => {
        if (!convoId || convoId === "newChat") {
            setIsLoaded(true);
            return
        }
        
        try {
            const response = await getConvo(convoId);

            // Check to see if user is a member of the convo
            let userIsInConvo = false;

            response.members.forEach(member => {
                if (member.id === props.user.id) userIsInConvo = true;
            });
            if (userIsInConvo) setUserInConvo(true);
            setConvo({ ...response, members: response.members });
        } catch {
        }
        setIsLoaded(true);
    }

    if (!isLoaded) return <Loader />

    // New chat
    if (convoId === "newChat") 
        return <NewConvo 
                    currentUser={props.user} 
                    setUser={props.setUser} 
                    state={props.state}
                    setState={props.setState}
                />
    
    if (!userInConvo) return <Navigate to="/" />

    if (!convo) return (
        <div>
            There was an error loading this convo
        </div>
    ) 

    return (<Messages 
                user={props.user} 
                convo={convo}
                setUser={props.setUser} />)
}
export default LoadMessages