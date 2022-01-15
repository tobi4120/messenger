import React, { useState, useEffect, useReducer } from "react";
import { user, message } from "../../interfaces";
import ProfilePic from "../convoItemComponents/profilePic";

interface props {
    user: user
    message: message
}

const Message: React.FC<props> = (props) => {
    const [className, setClassName] = useState<string>("message");
    const [currentUser, setCurrentUser] = useState<boolean>(false);

    // Let CSS know which message is sent by the current user so it can align it to the right
    useEffect(() => {
        if (props.message.user.email === props.user.email) {
            setClassName(className + "CurrentUser")
            setCurrentUser(true);
        }
    }, [])

    if (currentUser)

    return (
        <div className={className}>
            <div className={`${className}__right`}>
                <ProfilePic imageLocation={props.message.user.profile_pic} /> 
            </div>
            <div className={`${className}__left`}>
                <p className={`${className}__left__text`}>{props.message.message}</p> 
            </div>
        </div>
    )

    return (
        <div className={className}>
            <div className={`${className}__left`}>
                <ProfilePic imageLocation={props.message.user.profile_pic} /> 
            </div>
            <div className={`${className}__right`}>
                <p className={`${className}__right__text`}>{props.message.message}</p> 
            </div>
        </div>
    )
}
export default Message