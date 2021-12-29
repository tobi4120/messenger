import React, { useState, useEffect } from "react";
import { handleChange } from "../../helperFunctions/handleChange";
import { login, getUserData, logout } from "../API/auth";
import { Navigate } from 'react-router-dom';

interface stateFields {
    email: string, 
    password: string,
    authenticated: boolean
}

const Login = () => {
    const [state, setState] = useState<stateFields>({
        email: "",
        password: "",
        authenticated: false
    });

    useEffect(() => {
        checkForToken();
    }, []);

    // Check if user is logged in. If so then log them out.
    const checkForToken = async (): Promise<void> => {
        if (localStorage.getItem('token') !== null) {
            try {
                await getUserData();
            } catch (error) {
                localStorage.removeItem("token");
                return;
            }
            logout();
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault(); 

        // Call login function to contact the loginAPI
        const response = await login(state.email, state.password);

        // Check if password or usernmae was incorrect
        if (response == "Incorrect Credentials") {
            alert("Email address or password is incorrect");

            // Clear email and password inputs
            setState({ ...state, email: "", password: "" });
        } else {
            setState({ ...state, authenticated: true }); // user has logged in successfully
        }
    }

    if (state.authenticated === true)
        return <Navigate to="/" />

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input 
                    name="email"
                    type="email" 
                    value={ state.email } 
                    placeholder="Enter your email address..."
                    onChange={(e) => setState(handleChange(e, state))}
                    required /><br />

                <label>Password</label>
                <input 
                    name="password"
                    type="password" 
                    value={ state.password } 
                    placeholder="Enter your password..."
                    onChange={(e) => setState(handleChange(e, state))}
                    required /><br />

                <input 
                    type="submit"
                    value="Log in"
                />
            </form>
        </div>
    )
};
export default Login;