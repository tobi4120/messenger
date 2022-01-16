import React, { useState, useEffect, useRef } from "react";
import { user, convo } from "../../interfaces";
import Header from "../convoItemComponents/header";
import Message from "./message";
import TimeSent from "./timeSent";
import NewMessage from "./newMessage";

interface props {
    user: user
    convo: convo
    homeSocket: any
}
const Messages: React.FC<props> = (props) => {
    const [ convo, setConvo ] = useState<convo>(props.convo);
    const msgsContentElem = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [props.convo, convo.messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    // const scrollToBottom = () => {
    //     if (msgsContentElem.current) {
    //         msgsContentElem.current.scrollTop = msgsContentElem.current.scrollHeight;
    //         console.log(msgsContentElem.current.scrollTop)
    //     }
    // }

    return (
        <div className="messages">

            <div className="messages__content" ref={msgsContentElem}>
                {/* Header */}
                <div className="messages__header">
                    <Header 
                        convo={convo}
                        user={props.user}
                        headerType={"h1"} />
                </div>

                {/* Message body */ }
                <div className="messages__body">
                    {convo.messages.map((message, index) => {
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
                                    prevMessage={prevMessage}
                                    message={message} /> 
                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Type new message */}
            <div className="messages__newMsg">
                { <NewMessage 
                    convoID={convo.id}
                    user={props.user}
                    updateMessagesState={setConvo}
                    oldConvo={convo}
                    homeSocket={props.homeSocket}
                    scrollToBottom={scrollToBottom} /> }
            </div>
        </div>
    )
};
export default Messages;