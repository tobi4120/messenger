import React, { useEffect, useState } from "react";
import { user, convo } from "../../interfaces";
import ProfilePic from "../convoItemComponents/profilePic";
import Header from "../convoItemComponents/header";
import LastMessage from "../convoItemComponents/lastMessage";
import { timeLastSent } from "../../../helperFunctions/timeLastSent";
import { useNavigate  } from 'react-router-dom';

interface Props {
    user: user
    convo: convo
    state: any
    setState: any
}

const ConvoItem: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const [className, setClassName] = useState<string>("convoItem");
    let picCount = 0;

    useEffect(() => {
        if (!props.state.urlParam) return

        if (parseInt(props.state.urlParam) === props.convo.id) {
            setClassName("convoItem active")
        } else {
            setClassName("convoItem")
        }
    }, [props.state.urlParam])

    return (
        <div className={className} onClick={() => { 
                props.setState({ ...props.state, newChat: false })
                navigate(`/convo/${props.convo.id}`) 
            }}>

            {/* Left half */}
            <div className="convoItem__left">

                {/* Convo image */}
                <div className="convoItem__left__memberImages">

                    {/* Group convos */}
                    {props.convo.members.length > 2 ? 
                        <div className="convoItem__left__memberImages__multiple">
                            {props.convo.members.map((member, index) => {
                                if (member.email !== props.user.email) {

                                    if (picCount < 2)  {
                                        picCount++
                                        return (
                                            <div className={`convoItem__left__memberImages__multiple__${picCount}`}>
                                                <ProfilePic imageLocation={member.profile_pic} /> 
                                            </div> 
                                        )
                                    }
                                }
                            })}
                        </div> :

                        // One-on-one convos
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