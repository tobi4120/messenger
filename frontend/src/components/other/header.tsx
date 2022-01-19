import React, { useState, useEffect, useRef } from "react";
import ProfilePic from "../home/convoItemComponents/profilePic";
import Dropdown from "./dropdown";

interface props {
    userImage: string | null
}
const Header: React.FC<props> = (props) => {
    const [dropDown, setDropDown] = useState<boolean>(false);
    const dropdownRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        // When user clicks outside the dropdown, close it
        function handleClickOutside(event: any) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropDown(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef])

    return (
        <div className="header">
            <div className="header__left">
                <img className="header__left__logo" src="../../../static/images/MsgLogo.png" alt="logo" />
                <h1 className="header__left__appName">Messaging</h1>
            </div>
            <div className="header__right">
                <div className="header-profile-pic">
                    <div className="header-profile-pic__img" onClick={() => setDropDown(!dropDown)}>
                        <ProfilePic imageLocation={props.userImage} />
                    </div>
                    { dropDown && 
                        <div ref={dropdownRef}>
                           <Dropdown /> 
                        </div> 
                    }
                </div>
            </div>
        </div>
    )
}
export default Header;