import React from "react";
import { user, message } from "../../interfaces";

interface props {
    user: user
    lastMessage: message
}

const LastMessage: React.FC<props> = (props) => {
    return (
        <div className="convoItem__right__lastMessage__messageAndUser">
            <p>
                {props.lastMessage.user.email === props.user.email ? "You: " : props.lastMessage.user.first_name + ": "}
            </p>
            <p className="convoItem__right__lastMessage__messageAndUser__msg">
                {props.lastMessage.message}
            </p>
        </div>
    )
}
export default LastMessage;