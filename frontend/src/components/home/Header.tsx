import React from "react";
import ProfilePic from "../home/convoItemComponents/profilePic";

interface props {
    userImage: string | null
}

const Header: React.FC<props> = (props) => {
    return (
        <div className="header">
            <div className="header__left">
                <img className="header__left__logo" src="../../../static/images/MsgLogo.png" alt="logo" />
                <h1 className="header__left__appName">Messaging</h1>
            </div>
            <div className="header__right">
                <ProfilePic imageLocation={props.userImage} />
            </div>
        </div>
    )
}
export default Header;