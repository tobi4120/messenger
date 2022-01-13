import React from "react";
import { user } from "../../interfaces";
import ConvoItem from "../menu/convoItem";
import ProfilePic from "../convoItemComponents/profilePic";
import { useNavigate  } from 'react-router-dom';

interface Props {
    user: user
    state: any
    setState: any
}

const Menu: React.FC<Props> = (props) => {  
    const navigate = useNavigate();

    return (
        <div className="menu">
            <div className="menu__header">
                <h1 className="menu__header__heading">Chats</h1>
                <button className="menu__header__newChat" onClick={() => {
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
                        <p>New message</p>
                    </div>
                </div> 
            }

            {/* Convos */}
            {props.user.convos.map(convo => {
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
    )
};
export default Menu;