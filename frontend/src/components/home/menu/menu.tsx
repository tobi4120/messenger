import React from "react";
import { user } from "../../interfaces";
import ConvoItem from "../menu/convoItem";

interface Props {
    user: user
}

const Menu: React.FC<Props> = (props) => {    
    return (
        <div className="menu">
            <h1>Chats</h1>

            {/* Convo Items */}
            {props.user.convos.map(convo => {
                return (
                    <ConvoItem key={convo.id} user={props.user} convo={convo} />
                )
            })}
        </div>
    )
};
export default Menu;