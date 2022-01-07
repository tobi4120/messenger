import axios from 'axios';
const regeneratorRuntime = require("regenerator-runtime");
import { getCookie } from './cookie'
import { convo, user } from "../interfaces";

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

    // Update convo's timeOfLastMsg field
    await axios.put(`/api_convos/${convoID}/`, {
        timeOfLastMsg: new Date().toISOString()
    }, { headers: headers })

    return response.data
}

// Create new convo
export const createConvo = async (usersInConvo: any): Promise<convo> => {
    const response = await axios.post('/api_convos/', { headers: headers })
    
    //Add convo to user's convo field
    for (let i = 0; i < usersInConvo.length; i++) {

        await axios.patch(`/api_users/${usersInConvo[i].id}/`, {
            convos: [...usersInConvo[i].convos, response.data.id]
        }, { headers: headers })
    }
    return response.data
}