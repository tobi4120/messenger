import React, { useState, useEffect } from "react";
import { convo, user } from "../../interfaces";
import { handleChange } from "../../../helperFunctions/handleChange";
import { saveMessageAPI } from "../../API/messagesAPI";
import { updateMenu } from "../../../helperFunctions/menuFunctions";

interface state {
    newMessage: string
}

interface props {
    user: user
    convoID: number
    updateMessagesState: any
    oldConvo: convo
    setUser: any
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
            const data = JSON.parse(e.data);

            // Update state
            updateState(data)
        }
    }, [props.oldConvo])

    const saveMessage = async () => {
        // Check if message is empty
        if (state.newMessage === "") return

        // Call API
        const response = await saveMessageAPI(state.newMessage, props.user.id, props.convoID);

        // Send message to websocket
        chatSocket.send(JSON.stringify(response));

        // Clear textbox
        setState({ ...state, newMessage: "" });
    }

    const updateState = (response: any) => {
        // Update messages state (so the message show automatically on the screen)
        props.updateMessagesState(({ ...props.oldConvo, messages: [...props.oldConvo.messages, response] }));

        // Update menu to account for new message
        updateMenu(props.user, props.convoID, response, props.setUser);
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