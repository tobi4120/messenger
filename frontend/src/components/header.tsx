import React from "react";

const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="header__left">
                <img className="header__left__logo" src="../../static/images/MsgLogo.png" />
                <h1 className="header__left__appName">Messaging</h1>
            </div>
        </div>
    )
}
export default Header;