import React, { useState } from "react";
import { user, convo } from "../../interfaces";

interface Props {
    user: user
    convo: convo
}

const Header: React.FC<Props> = (props) => {
    //const [membersString, setMembersString] = useState<string>();
    let membersString = "";
    
    // If convo has a name, render it
    if (props.convo.name) return (<h3>{props.convo.name}</h3>)

    // Else render out all the names of the members in the chat
    if (props.convo.members.length = 2) {

        // Only render the name that isn't the current user
        if (props.convo.members[0].email === props.user.email) {
            return (
                <h3>{props.convo.members[1].first_name + " " + props.convo.members[1].last_name}</h3>
            )
        } else {
            return (
                <h3>{props.convo.members[0].first_name + " " + props.convo.members[0].last_name}</h3>
            )
        }
    }

    // Multiple names render
    let seperator = ", ";
    props.convo.members.forEach((member, index) => {
        if (index === 0) seperator = "";

        // Only render the names that aren't the current user
        if (member.email !== props.user.email)
            membersString += seperator + member.first_name;
        
    })
    return (<h3>{membersString}</h3>)

}
export default Header;