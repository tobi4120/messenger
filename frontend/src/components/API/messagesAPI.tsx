import axios from 'axios';
const regeneratorRuntime = require("regenerator-runtime");
import { getCookie } from './cookie'
import { convo } from "../interfaces";

// Configure axios to accept the CSRF Token
const headers = {
    'X-CSRFToken': getCookie('csrftoken') || ""
}

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

// Get a specific convo based on the convo ID
export const getConvo = async (convoId: string): Promise<convo> => {
    const response = await axios.get(`/api_convos/${convoId}`)
    
    return response.data
}

// Save message
export const saveMessageAPI = async (message: string, userID: number, convoID: number) => {
    const response = await axios.post('/api_messages/', {
        message: message,
        user: userID,
        convo: convoID
    }, { headers: headers })

    return response.data
}