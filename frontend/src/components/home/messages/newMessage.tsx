import React, { useState } from "react";
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

    const saveMessage = async () => {
        // Check if message is empty
        if (state.newMessage === "") return

        // Call API
        const response = await saveMessageAPI(state.newMessage, props.user.id, props.convoID);

        // Update messages state (so the message show automatically on the screen)
        props.updateMessagesState(({ ...props.oldConvo, messages: [...props.oldConvo.messages, response] }));

        // Update menu to account for new message
        updateMenu(props.user, props.convoID, response, props.setUser);

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