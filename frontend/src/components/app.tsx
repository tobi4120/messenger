import React from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./auth/login";
import Register from "./auth/register";
import Home from "./home/home";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </Router>
    )
};
export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);