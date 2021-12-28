import React, { useState } from "react";
import { handleChange } from "../helperFunctions/handleChange";

interface inputFields {
    firstName: string,
    lastName: string,
    email: string, 
    password: string,
}

const Register = () => {
    const [state, setState] = useState<inputFields>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div>
            <h1>Register</h1>
            <form>

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