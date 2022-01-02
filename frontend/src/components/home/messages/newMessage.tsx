import React, { useReducer, useState } from "react";
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
    setUser: any
}

const NewMessage: React.FC<props> = (props) => {
    const [state, setState] = useState<state>({
        newMessage: ""
    });

    const saveMessage = async () => {
        // Check if message is empty
        if (state.newMessage === "") return

        // Call API
        const response = await saveMessageAPI(state.newMessage, props.user.id, props.convoID);

        // Update messages state (so the message show automatically on the screen)
        props.updateMessagesState(({ ...props.oldConvo, messages: [...props.oldConvo.messages, response] }));

        // Get the correct convo index from the user's convos
        const convoIndex = props.user.convos.findIndex(x => x.id === props.convoID) 

        // Append new message to user's convo messages
        const newConvos = props.user.convos
        newConvos[convoIndex].messages.push(response)

        // Move the convo to the front of all of the convos (so that it will show first in the menu)
        const convo = newConvos.splice(convoIndex, 1)
        newConvos.unshift(convo[0]);

        // Update user state (so the menu updates) 
        props.setUser({ ...props.user, convos: newConvos })

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