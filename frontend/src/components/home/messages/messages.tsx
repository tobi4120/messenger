import React, { useState, useEffect } from "react";
import { user, convo } from "../../interfaces";
import Header from "../convoItemComponents/header";
import Message from "./message";
import TimeSent from "./timeSent";
import NewMessage from "./newMessage";

interface props {
    user: user
    convo: convo
    setUser: any
}

const Messages: React.FC<props> = (props) => {
    const [ convo, setConvo ] = useState<convo>(props.convo);

    return (
        <div className="messages">
            
            {/* Header */}
            <Header 
                convo={convo}
                user={props.user}
                headerType={"h1"} />

            {/* Render messages */
            convo.messages.map((message, index) => {
                let prevMessage = null;

                if (index !== 0 && convo) prevMessage = convo.messages[index - 1]

                return  (
                    <div className="messages__messageAndTimeSent">
                        <TimeSent 
                            timeMsgSent={message.sentAt}
                            timePrevMsgSent={prevMessage && prevMessage.sentAt} />
                        <Message 
                            key={message.id} 
                            user={props.user}
                            message={message} /> 
                    </div>
                )
            })}

            {/* Type new message */}
            { <NewMessage 
                convoID={convo.id}
                user={props.user}
                updateMessagesState={setConvo}
                oldConvo={convo}
                setUser={props.setUser}  /> }
        </div>
    )
};
export default Messages;