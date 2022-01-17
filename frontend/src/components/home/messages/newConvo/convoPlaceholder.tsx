import React, { useEffect, useState } from "react";
import { user, convo } from "../../../interfaces";
import Header from "../../convoItemComponents/header";
import { createConvo, saveMessageAPI } from "../../../API/messagesAPI";
import { handleChange } from "../../../../helperFunctions/handleChange";
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import SendIcon from '@mui/icons-material/Send';

interface props {
    currentUser: user
    convo: convo
    usersInConvo: user[]
    setUser: any
    state: any
    setState: any
    homeSocket: any
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

        // Create new convo and new message (call API's)
        const usersInConvo = [...props.usersInConvo, currentUser]
        let newConvo: convo = await createConvo(usersInConvo);
        let newMessage = await saveMessageAPI(
            state.newMessage, 
            props.currentUser.id, 
            newConvo.id)
        
        newMessage = { ...newMessage, convo: newConvo.id} // Change convo field to convo ID (so we don't have a circular, repeating object)

        // Set newChat state to false so that the newConvo placeholder goes away
        props.setState({ ...props.state, newChat: false });

        // ____________Send message to websocket_______________
        
        // Add members and messages to convo object
        newConvo = { ...newConvo, members: usersInConvo, messages: [... newConvo.messages, newMessage] };

        let webSocketMsg = newMessage;
        webSocketMsg = { ...webSocketMsg, convo: newConvo};
        props.homeSocket.send(JSON.stringify(webSocketMsg));

        // Navigate to the URL of the new convo
        navigate(`/convo/${newConvo.id}`);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === "Enter") {
            e.preventDefault();
            saveMessage();
        } 
    }

    return (
        <div className="messages messagesNewConvo">
            <div className="messages__header">
                <Header 
                    convo={props.convo}
                    user={props.currentUser}
                    headerType="h1" />
            </div>

            <div className="messages__newMsg">
                <div className="messages__newMsg__text">
                    <TextareaAutosize
                        name="newMessage"
                        value={state.newMessage}
                        placeholder="Write a message..."
                        onChange={(e) => setState(handleChange(e, state))}
                        onKeyDown={handleKeyDown} />
                    <SendIcon onClick={saveMessage} />
                </div>
            </div>
        </div>
    )
}
export default ConvoPlaceholder;