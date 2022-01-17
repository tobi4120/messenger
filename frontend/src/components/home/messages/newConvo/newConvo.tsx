import React, { useEffect, useState, useRef } from "react";
import { getAllUsers } from "../../../API/auth";
import { user, convo } from "../../../interfaces";
import Loader from "../../../other/loading";
import ProfilePic from "../../convoItemComponents/profilePic";
import ConvoPlaceholder from "./convoPlaceholder";

interface props {
    currentUser: user
    setUser: any
    state: any
    setState: any
    homeSocket: any
}

const NewConvo: React.FC<props> = (props) => {
    const [users, setUsers] = useState<user[]>();
    const [usersInConvo, setUsersInConvo] = useState<user[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [convoObject, setConvoObject] = useState<convo>({
        "id": 1,
        "messages": [],
        "members": [],
        "name": "",
        "timeOfLastMsg": ""
    })
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        props.setState({ ...props.state, newChat: true })
        getAllUsersFromAPI();
        setConvoObject({ ...convoObject, members: [ ...convoObject.members, props.currentUser ]});
    }, []);

    const getAllUsersFromAPI = async () => {
        const response = await getAllUsers();
        setUsers(response);
    }

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    }

    const addUserToInput = (user: user) => {

        // Don't add the user if it's the current user (i.e a user cannot msg themself) or if the user is already on the convo
        if (user.id !== props.currentUser.id && (!usersInConvo.includes(user))) {
            
            // Add user to the list of users that are to be on the new convo
            setUsersInConvo([ ...usersInConvo, user]);

            // Add user to convoObject
            setConvoObject({ ...convoObject, members: [ ...convoObject.members, user ]});

            // Autofocus the input
            inputRef.current?.focus();
        }

        // Set input to blank
        setInputValue("");
    }

    const removeFromInput = (user: user) => {
        const index = usersInConvo.indexOf(user);
        if (index > -1) {
            setUsersInConvo(usersInConvo.filter(userInArray => userInArray != user));

            // Autofocus the input
            inputRef.current?.focus();
        }
    }

    if (!users) return <Loader />

    return (
        <div className="newConvo">

            {/* Add user input */}
            <div className="newConvo__addUsers">
                <p className="newConvo__addUsers__label">To:</p>

                {/* Users to be added */}
                { usersInConvo?.map(user => {
                    return ( 
                        <div className="newConvo__addUsers__user">
                            <p>{user.first_name + " " + user.last_name}</p>
                            <span onClick={() => removeFromInput(user)}>&#10005;</span>
                        </div>
                    )
                })}
                
                {/* Input */}
                <div className="newConvo__addUsers__input">
                    <input 
                        ref={inputRef}
                        autoFocus
                        list="users" 
                        name="users"
                        onChange={handleChange}
                        value={inputValue}
                        autoComplete="off" />

                    {/* User dropdown */}
                    <div className="newConvo__addUsers__input__dropdown">
                        { users.map(user => {
                            const userName = (user.first_name + user.last_name).toLowerCase();
                            if ((userName).startsWith(inputValue.toLowerCase())
                                && inputValue !== "")
                                return (
                                    <a className="user" onClick={() => addUserToInput(user)}>
                                        <ProfilePic imageLocation={user.profile_pic} />
                                        <p>{user.first_name + " " + user.last_name}</p>
                                    </a>
                                )
                        })}
                    </div>

                </div>
            </div>

            {/* Create convo placeholder */}
            { usersInConvo[0] &&
                <ConvoPlaceholder
                    currentUser={props.currentUser}
                    convo={convoObject} 
                    usersInConvo={usersInConvo}
                    setUser={props.setUser}
                    state={props.state}
                    setState={props.setState}
                    homeSocket={props.homeSocket} />
            }
        </div>
    )
}
export default NewConvo;