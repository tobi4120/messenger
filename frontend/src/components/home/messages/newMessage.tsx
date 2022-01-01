import React, { useState } from "react";
import { convo } from "../../interfaces";
import { handleChange } from "../../../helperFunctions/handleChange";
import { saveMessageAPI } from "../../API/messagesAPI";

interface state {
    newMessage: string
}

interface props {
    currentUserID: number
    convoID: number
    updateMessagesState: any;
    oldConvo: convo;
}

const NewMessage: React.FC<props> = (props) => {
    const [state, setState] = useState<state>({
        newMessage: ""
    });

    const saveMessage = async () => {
        // Check if message is empty
        if (state.newMessage === "") return

        // Call API and update state
        const response = await saveMessageAPI(state.newMessage, props.currentUserID, props.convoID);
        props.updateMessagesState(({ ...props.oldConvo, messages: [...props.oldConvo.messages, response] }));

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