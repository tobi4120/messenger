import React, { useState, useEffect, useRef } from "react";
import { convo, user } from "../../interfaces";
import { handleChange } from "../../../helperFunctions/handleChange";
import { saveMessageAPI } from "../../API/messagesAPI";
import TextareaAutosize from 'react-textarea-autosize';
import SendIcon from '@mui/icons-material/Send';

interface state {
    newMessage: string
}

interface props {
    user: user
    convoID: number
    updateMessagesState: any
    oldConvo: convo
    homeSocket: any
}

const NewMessage: React.FC<props> = (props) => {
    const [state, setState] = useState<state>({
        newMessage: ""
    });
    // Convo ref (need to use this in useEffect)
    const convoRef = useRef<convo>(props.oldConvo);
    convoRef.current = props.oldConvo;

    // Web socket
    const ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    const roomName = JSON.parse(props.convoID.toString());
    const chatSocket = new WebSocket(
        ws_scheme + 
        '://' +
        window.location.host +
        '/ws/convo/' +
        roomName +
        '/'
    );

    useEffect(() => { 
        // Web socket -- on message
        chatSocket.onmessage = (e) => {
            const msg = JSON.parse(e.data);

            // Update messages state (so the new message shows automatically on the screen)
            props.updateMessagesState(({ ...convoRef.current, messages: [...convoRef.current.messages, msg] }));
        }
    }, [])

    const saveMessage = () => {
        // Check if message is empty
        if (state.newMessage === "") return

        // Check if homeSocket is null
        if (!props.homeSocket) return

        // Call API
        saveMessageAPI(state.newMessage, props.user.id, props.convoID);

        const message = {
            "id": 1,
            "message": state.newMessage,
            "sentAt": new Date().toISOString(),
            "user": props.user,
            "convo": props.oldConvo.id
        }
        // Send message to chatSocket
        chatSocket.send(JSON.stringify(message));

        // Message for homeSocket
        const message2 = {
            "id": 1,
            "message": state.newMessage,
            "sentAt": new Date().toISOString(),
            "user": props.user,
            "convo": props.oldConvo
        }

        // Send message to homeSocket
        //props.homeSocket.send(JSON.stringify(message2));

        // Clear textbox
        setState({ ...state, newMessage: "" });
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === "Enter") {
            e.preventDefault();
            saveMessage();
        } 
    }

    return (
        <div className="messages__newMsg__text">
            <TextareaAutosize 
                name="newMessage"
                value={state.newMessage}
                placeholder="Write a message..."
                onChange={(e) => setState(handleChange(e, state))}
                onKeyDown={handleKeyDown}
            />
            <SendIcon onClick={saveMessage} />
        </div>
    )
}
export default NewMessage