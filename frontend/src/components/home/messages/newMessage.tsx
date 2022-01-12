import React, { useState, useEffect, useRef } from "react";
import { convo, user } from "../../interfaces";
import { handleChange } from "../../../helperFunctions/handleChange";
import { saveMessageAPI } from "../../API/messagesAPI";

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

    const saveMessage = async () => {
        // Check if message is empty
        if (state.newMessage === "") return

        // Call API
        let response = await saveMessageAPI(state.newMessage, props.user.id, props.convoID);

        // Update convo field so it's the entire convo, not just the ID
        response.convo = props.oldConvo

        // Send message to websockets
        props.homeSocket.send(JSON.stringify(response));
        chatSocket.send(JSON.stringify(response));

        // Clear textbox
        setState({ ...state, newMessage: "" });
    }

    return (
        <div className="messages__newMessage">
            <textarea
                name="newMessage"
                value={state.newMessage}
                placeholder="Write a message..."
                onChange={(e) => setState(handleChange(e, state))} />
            <button onClick={saveMessage}>Send</button>
        </div>
    )
}
export default NewMessage