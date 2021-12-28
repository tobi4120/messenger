import React from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./login";
import Register from "./register";

import Home from "./home/home";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/convo" element={<Home />} />
                <Route path="/convo/:convoCode" element={<Home />} />
            </Routes>
        </Router>
    )
};
export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);