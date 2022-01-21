import axios from 'axios';
const regeneratorRuntime = require("regenerator-runtime");
import { getCookie } from './cookie'

// Configure axios to accept the CSRF Token
const headers = {
    'X-CSRFToken': getCookie('csrftoken') || ""
}

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

// Upload profile image
export const uploadProfileImage = async (uploadData: any, userID: number) => {
    const response = await axios.patch(`/api_users/${userID}/`, uploadData, { headers: headers })
    return response.data
}