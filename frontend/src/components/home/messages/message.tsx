import React from "react";
import { message } from "../../interfaces";
import ProfilePic from "../convoItemComponents/profilePic";
import TimeSent from "./timeSent";

interface props {
    message: message
    prevMessage: message | null
}

const Message: React.FC<props> = (props) => {
    return (
        <div className="messages__message">
            <div className="messages__message__left">
                <ProfilePic imageLocation={props.message.user.profile_pic} />
            </div>
            <div className="messages__message__right">
                <TimeSent 
                    timeMsgSent={props.message.sentAt}
                    timePrevMsgSent={props.prevMessage && props.prevMessage.sentAt} />
                <p>{props.message.message}</p>
            </div>
        </div>
    )
}
export default Message