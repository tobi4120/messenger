import React, { useState, useEffect, useReducer } from "react";
import { user, message } from "../../interfaces";
import ProfilePic from "../convoItemComponents/profilePic";

interface props {
    user: user
    message: message
    prevMessage: message | null
}

const Message: React.FC<props> = (props) => {
    const [className, setClassName] = useState<string>("message");
    const [currentUser, setCurrentUser] = useState<boolean>(false);
    const [greaterThanOneHour, setGreaterThanOneHour] = useState<boolean>(true);
    const [msgMarginTop, setMsgMarginTop] = useState<string>("0px");

    // Let CSS know which message is sent by the current user so it can align it to the right
    useEffect(() => {
        if (props.message.user.email === props.user.email) {
            setClassName(className + "CurrentUser")
            setCurrentUser(true);
        }

        if (props.prevMessage) {
            const difference = Date.parse(props.message.sentAt) - Date.parse(props.prevMessage.sentAt);
            const hours = Math.floor(difference / 3.6e+6);
            if (hours <= 1 && props.prevMessage.user.email === props.message.user.email) {
                setGreaterThanOneHour(false); 
            }
        }

        // Msg padding
        if (props.prevMessage) {
            if (props.prevMessage.user.email !== props.message.user.email) {
                setMsgMarginTop("20px")
            }
        }
    }, [])

    if (currentUser)

    return (
        <div className={className} style={{ marginTop: msgMarginTop }}>
            <div className={`${className}__right`}>
                { greaterThanOneHour && <ProfilePic imageLocation={props.message.user.profile_pic} /> }
            </div>
            <div className={`${className}__left`}>
                <p className={`${className}__left__text`}>{props.message.message}</p> 
            </div>
        </div>
    )

    return (
        <div className={className} style={{ marginTop: msgMarginTop }}>
            <div className={`${className}__left`}>
                { greaterThanOneHour && <ProfilePic imageLocation={props.message.user.profile_pic} /> }
            </div>
            <div className={`${className}__right`}>
                <p className={`${className}__right__text`}>{props.message.message}</p> 
            </div>
        </div>
    )
}
export default Message