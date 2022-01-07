import axios from 'axios';
const regeneratorRuntime = require("regenerator-runtime");
import { getCookie } from './cookie'

// Configure axios to accept the CSRF Token
const headers = {
    'X-CSRFToken': getCookie('csrftoken') || ""
}

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

// Get user data from token
export const getUserData = async (): Promise<any> => {
    const response = await axios.get("/userAPI", {headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
    }})
    return response
}

// Login
export const login = async (email: string, password: string): Promise<string | undefined> => {
    let error = "";
    const response = await axios.post('/loginAPI', {
        email: email,
        password: password,
    }, { headers: headers })
    .catch((err) => {
        // Put non field error (like incorrect credentials) in error varaible (if any)
        error = err.response.data.non_field_errors[0]
    });

    if (error) return error

    // Put token in local storage
    if (response) { 
        localStorage.setItem('token', response.data.token)
    }
}

// Register
export const register = async (first_name: string, last_name: string, email: string, password: string) => {
    let error = "";
    const response = await axios.post('/registerAPI', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
    }, { headers: headers })
    .catch((err) => {
        error = err.response.data.email[0]
    });

    if (error) return error
    
    // Put token in local storage
    if (response) 
        localStorage.setItem('token', response.data.token);
}

// Logout 
export const logout = async ():Promise<void> => {
    // Delete token from server
    const new_headers = {
        'X-CSRFToken': getCookie('csrftoken') || "",
        'Authorization': `Token ${localStorage.getItem('token')}`
        };

    await axios.post('/logoutAPI', {
    }, { headers: new_headers });

    // Remove token from local storage
    localStorage.removeItem('token');
}

// Get all users
export const getAllUsers = async () => {
    const response = await axios.get('/api_users');
    return response.data;
}