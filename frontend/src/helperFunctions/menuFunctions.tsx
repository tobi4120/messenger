import { user, message } from "../components/interfaces";

export const updateMenu = (user: user, convoID: number, message: message, setUserFunc: any) => {
    // Get the correct convo index from the user's convos
    const convoIndex = user.convos.findIndex(x => x.id === convoID) 

    // Append new message to user's convo messages
    const newConvos = user.convos

    if (convoIndex > -1)
        newConvos[convoIndex].messages.push(message)

    // Move the convo to the front of all of the convos (so that it will show first in the menu)
    const convo = newConvos.splice(convoIndex, 1)
    newConvos.unshift(convo[0]);

    // Update user state (so the menu updates) 
    setUserFunc({ ...user, convos: newConvos })
}