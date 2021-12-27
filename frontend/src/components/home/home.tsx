import React from "react";
import Menu from "./menu";
import Messages from "./messages/messages";

const Home: React.FC = () => {
    return (
        <div className="home">
            <Menu />
            <Messages />
        </div>
    )
};
export default Home;