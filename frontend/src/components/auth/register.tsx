import React, { useState, useEffect } from "react";
import { handleChange } from "../../helperFunctions/handleChange";
import { register, getUserData, logout } from "../API/auth";
import { Navigate } from 'react-router-dom';
import AuthPreview from "./authPreview";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface stateFields {
    firstName: string,
    lastName: string,
    email: string, 
    password: string,
    authenticated: boolean
    visibility: boolean
}

const Register = () => {
    const [state, setState] = useState<stateFields>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        authenticated: false,
        visibility: false
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

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
        <div className="auth">
            <AuthPreview />
            <div className="auth__authForm">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>

                    <label>First name</label><br />
                    <input 
                        name="firstName"
                        type="text" 
                        value={ state.firstName } 
                        placeholder="Enter your first name..."
                        onChange={(e) => setState(handleChange(e, state))}
                        required /><br />
                    
                    <label>Last name</label><br />
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

                    <div className="auth__authForm__password-input">
                        <input 
                            name="password"
                            type={showPassword? "text": "password"}
                            value={ state.password } 
                            placeholder="Enter your password..."
                            onChange={(e) => setState(handleChange(e, state))}
                            required />
                        
                        { state.visibility ?
                            <div className="visibility-btn">
                                <VisibilityIcon
                                    onClick={() =>  { 
                                        setShowPassword(!showPassword)
                                        setState({ ...state, visibility: !state.visibility })
                                    }} /><br />
                            </div> :

                            <div className="visibility-btn">
                                <VisibilityOffIcon
                                    onClick={() =>  { 
                                        setShowPassword(!showPassword)
                                        setState({ ...state, visibility: !state.visibility })
                                    }} /><br />
                            </div> 
                        }
                    </div>

                    <input 
                        type="submit"
                        value="Register"
                    />

                    <p className="link">Already have an account? <a href="/login">Login</a></p>
                </form>
            </div>
        </div>
    )
};
export default Register;