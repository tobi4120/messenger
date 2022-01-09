import React, { useState, useEffect } from "react";
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

    // Web socket
    const roomName = JSON.parse(props.convoID.toString());
    const chatSocket = new WebSocket(
        'ws://' +
        window.location.host +
        '/ws/convo/' +
        roomName +
        '/'
    );

    useEffect(() => { 
        // Web socket -- on message
        chatSocket.onmessage = (e) => {
            const msg = JSON.parse(e.data);

            // Update messages state (so the message show automatically on the screen)
            props.updateMessagesState(({ ...props.oldConvo, messages: [...props.oldConvo.messages, msg] }));
        }
    }, [])

    const saveMessage = async () => {
        // Check if message is empty
        if (state.newMessage === "") return

        // Call API
        const response = await saveMessageAPI(state.newMessage, props.user.id, props.convoID);

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