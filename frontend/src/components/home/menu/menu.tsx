import React from "react";
import { user } from "../../interfaces";
import ConvoItem from "../menu/convoItem";
import ProfilePic from "../convoItemComponents/profilePic";
import { useNavigate  } from 'react-router-dom';

interface Props {
    user: user
    convos: any
    state: any
    setState: any
}

const Menu: React.FC<Props> = (props) => {  
    const navigate = useNavigate();

    return (
        <div className="menu">

            {/* Menu header */}
            <div className="menu__header">
                <h1 className="menu__header__heading">Chats</h1>
                <button className="menu__header__newChat" onClick={() => {
                    props.setState({ ...props.state, newChat: true })
                    navigate("/convo/newChat");
                }}>&#x2b;</button>
            </div>
            
            {/* New chat */}
            { props.state.newChat &&
                <div className="menu__newMsg convoItem">
                    <div className="convoItem__left">
                        <div className="convoItem__left__memberImages">
                            <ProfilePic imageLocation={null} />
                        </div>
                    </div>
                    <div className="convoItem__right">
                        <p className="convoItem__right__newMsg">New message</p>
                    </div>
                </div> 
            }

            {/* Convos */}
            <div className="menu__body">
                {props.convos.map((convo: any) => {
                    return (
                        <ConvoItem 
                            key={convo.id} 
                            user={props.user} 
                            convo={convo}
                            state={props.state}
                            setState={props.setState} />
                    )
                })}
            </div>

            {/* No convos */}
            { (props.convos.length === 0 && !props.state.newChat) &&
                <div className="no-convos-menu">
                    <p className="no-convos-menu__text">No messages found.</p>
                </div> }

        </div>
    )
};
export default Menu;