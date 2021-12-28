import axios from 'axios';
const regeneratorRuntime = require("regenerator-runtime");
import { getCookie } from './cookie'

// Configure axios to accept the CSRF Token
const headers = {
    'X-CSRFToken': getCookie('csrftoken') || ""
}

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

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

    if (error) {
        return error
    }

    // Put token in local storage
    if (response) { 
        localStorage.setItem('token', response.data.token)
    }
}