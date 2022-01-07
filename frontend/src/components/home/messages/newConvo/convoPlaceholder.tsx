import React, { useEffect, useState } from "react";
import { user, convo } from "../../../interfaces";
import Header from "../../convoItemComponents/header";
import { createConvo, saveMessageAPI } from "../../../API/messagesAPI";
import { handleChange } from "../../../../helperFunctions/handleChange";
import { useNavigate } from 'react-router-dom';

interface props {
    currentUser: user
    convo: convo
    usersInConvo: user[]
    setUser: any
    state: any
    setState: any
}

interface state {
    newMessage: string
}

const ConvoPlaceholder: React.FC<props> = (props) => {
    const [state, setState] = useState<state>({
        newMessage: "",
    });
    const navigate = useNavigate();

    const saveMessage = async () => {
        if (state.newMessage === "") return

        // Clear state
        setState({ ...state, newMessage: ""})

        let userConvoIds: number[] = []

        // Put convo ids in an array
        props.currentUser.convos.forEach(convo => {
            userConvoIds.push(convo.id);
        });
        const currentUser = {
            id: props.currentUser.id,
            convos: userConvoIds,
            email: props.currentUser.email,
            first_name: props.currentUser.first_name,
            last_name: props.currentUser.last_name,
            profile_pic: props.currentUser.profile_pic
        }

        // Create new convo and new message
        const usersInConvo = [...props.usersInConvo, currentUser]
        let newConvo: convo = await createConvo(usersInConvo);
        const newMessage = await saveMessageAPI(
            state.newMessage, 
            props.currentUser.id, 
            newConvo.id)

        // ____________Update state_______________
        // Add members and messages to convo object
        newConvo = { ...newConvo, members: usersInConvo, messages: [... newConvo.messages, newMessage] }

        // Prepend convo to user
        props.setUser({ ...props.currentUser, convos: [newConvo, ...props.currentUser.convos] }) 

        // Set newChat state to false so that the newConvo placeholder goes away
        props.setState({ ...props.state, newChat: false })

        // Navigate to the URL of the new convo
        navigate(`/convo/${newConvo.id}`)
    }

    return (
        <div>
            <Header 
                convo={props.convo}
                user={props.currentUser}
                headerType="h1" />

            <div>
                <textarea
                    name="newMessage"
                    value={state.newMessage}
                    placeholder="Write a message..."
                    onChange={(e) => setState(handleChange(e, state))} />
                <button onClick={saveMessage}>Send</button>
            </div>
        </div>
    )
}
export default ConvoPlaceholder;