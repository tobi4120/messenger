import React, { useState, useEffect, useReducer } from "react";
import { user, message } from "../../interfaces";
import ProfilePic from "../convoItemComponents/profilePic";

interface props {
    user: user
    message: message
}

const Message: React.FC<props> = (props) => {
    const [className, setClassName] = useState<string>("messages__message");
    let currentUser = false;

    // Let CSS know which message is sent by the current user so it can align it to the right
    useEffect(() => {
        if (props.message.user.email === props.user.email) {
            setClassName(className + " currentUser")
            currentUser = true;
        }
    }, [])

    return (
        <div className={className}>
            <div className="messages__message__left">
                { currentUser ? 
                    <p>{props.message.message}</p> : 
                    <ProfilePic imageLocation={props.message.user.profile_pic} /> 
                }
            </div>
            <div className="messages__message__right">
            { currentUser ? 
                    <ProfilePic imageLocation={props.message.user.profile_pic} />  : 
                    <p>{props.message.message}</p>
                }
            </div>
        </div>
    )
}
export default Message