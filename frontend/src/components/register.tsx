import React, { useState, useEffect } from "react";
import { handleChange } from "../helperFunctions/handleChange";
import { register, getUserData, logout } from "./API/auth";
import { Navigate } from 'react-router-dom';

interface stateFields {
    firstName: string,
    lastName: string,
    email: string, 
    password: string,
    authenticated: boolean
}

const Register = () => {
    const [state, setState] = useState<stateFields>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        authenticated: false
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        checkForToken();
    }, []);

    // Check if user is logged in. If so then log them out.
    const checkForToken = async (): Promise<void> => {
        if (localStorage.getItem('token') !== null) {
            const response = await getUserData();
            
            if (response === "Invalid token.") {
                localStorage.removeItem("token");
            } else {
                logout();
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // Call register function to contact the registerAPI
        const response = await register(state.firstName, state.lastName, state.email, state.password);

        // Check if email already exists
        if (response === "user with this email already exists.") {
            alert("A user with this email already exists");
            
            // Clear input fields
            setState({
                ...state,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            })
        } else {

            // Set register_submitted to true so that we redirect to home page
            setState({...state, authenticated: true})
        }
    }   

    if (state.authenticated) return <Navigate to="/" />

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

                <label>First name</label>
                <input 
                    name="firstName"
                    type="text" 
                    value={ state.firstName } 
                    placeholder="Enter your first name..."
                    onChange={(e) => setState(handleChange(e, state))}
                    required /><br />
                
                <label>Last name</label>
                <input 
                    name="lastName"
                    type="text" 
                    value={ state.lastName } 
                    placeholder="Enter your last name.."
                    onChange={(e) => setState(handleChange(e, state))}
                    required /><br />

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
                    type={showPassword? "text": "password"}
                    value={ state.password } 
                    placeholder="Enter your password..."
                    onChange={(e) => setState(handleChange(e, state))}
                    required />

                <button type="button" onClick={() => setShowPassword(!showPassword)}>Show password</button><br />

                <input 
                    type="submit"
                    value="Register"
                />
            </form>
        </div>
    )
};
export default Register;