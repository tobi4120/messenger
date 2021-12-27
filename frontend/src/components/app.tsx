import React from "react";
import { render } from 'react-dom';

import Home from "./home/home";

const App: React.FC = () => {
    return (
        <Home />
    )
};
export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);