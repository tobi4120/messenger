import React from "react";
import { user, convo } from "../../interfaces";

interface Props {
    user: user
    convo: convo
    headerType?: string
}

const Header: React.FC<Props> = (props) => {
    let membersString = "";
    
    // If convo has a name, render it
    if (props.convo.name) 
        return (
            props.headerType === "h1" ?  
                <h1>{props.convo.name}</h1> :
                <h3>{props.convo.name}</h3> 
        )

    // Else render out all the names of the members in the chat
    if (props.convo.members.length === 2) {

        // Only render the name that isn't the current user
        if (props.convo.members[0].email === props.user.email) {

            if (props.headerType === "h1") return (
                <h1>{props.convo.members[1].first_name + " " + props.convo.members[1].last_name}</h1>
            )

            return (
                <h3>{props.convo.members[1].first_name + " " + props.convo.members[1].last_name}</h3>
            )
        } else {
            if (props.headerType === "h1") return (
                <h1>{props.convo.members[0].first_name + " " + props.convo.members[0].last_name}</h1>
            )

            return (
                <h3>{props.convo.members[0].first_name + " " + props.convo.members[0].last_name}</h3>
            )
        }
    }

    // Multiple names render
    let seperator = ", ";
    props.convo.members.forEach((member, index) => {
        if (index === props.convo.members.length - 1) seperator = "";

        // Only render the names that aren't the current user
        if (member.email !== props.user.email)
            membersString += member.first_name + " " + member.last_name + seperator;
    })
    
    if (props.headerType === "h1") return (<h1>{membersString}</h1>)
    return (<h3>{membersString}</h3>)
}
export default Header;