import React, { useRef } from "react";
import { user, convo } from "../../interfaces";
import ProfilePic from "../convoItemComponents/profilePic";
import Header from "../convoItemComponents/header";
import LastMessage from "../convoItemComponents/lastMessage";
import { timeLastSent } from "../../../helperFunctions/timeLastSent";

interface Props {
    user: user
    convo: convo
}

const ConvoItem: React.FC<Props> = (props) => {
    return (
        <div className="convoItem">

            {/* Left half */}
            <div className="convoItem__left">

                {/* Convo image */}
                <div className="convoItem__left__memberImages">

                    {/* If convo has more than 2 members*/}
                    {props.convo.members.length > 2 ? 
                        <div className="convoItem__left__memberImages__multiple">
                            {props.convo.members.map(member => {
                                let count = 0

                                if (member.email !== props.user.email || count !== 2) {
                                    count++;
                                    return <ProfilePic imageLocation={member.profile_pic} /> 
                                }
                            })}
                        </div> :

                        // If convo has only 2 members
                        props.convo.members[0].email === props.user.email ? 
                            <ProfilePic imageLocation={props.convo.members[1].profile_pic} /> :
                            <ProfilePic imageLocation={props.convo.members[0].profile_pic} />
                    }
                </div>
            </div>

            {/* Right half */}
            <div className="convoItem__right">
                
                {/* Header */}
                <div className="convoItem__right__header">
                    <Header user={props.user} convo={props.convo} />
                </div>

                {/* Last message */}
                <div className="convoItem__right__lastMessage">
                    <LastMessage 
                        lastMessage={props.convo.messages[props.convo.messages.length - 1]} 
                        user={props.user} />

                    {/* How long ago the last message was sent */}
                    <div className="convoItem__right__lastMessage__lastSent">
                        <p>{timeLastSent(props.convo.messages[props.convo.messages.length - 1].sentAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default ConvoItem;