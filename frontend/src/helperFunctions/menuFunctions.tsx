import { user, message } from "../components/interfaces";

export const updateMenu = (user: user, convoID: number, message: message, setUserFunc: any) => {

    // Get the correct convo index from the user's convos
    const convoIndex = user.convos.findIndex(x => x.id === convoID) 

    // Append new message to user's convo messages
    let newConvos = user.convos;

    if (convoIndex > -1) {
        newConvos = [...user.convos.slice(0, convoIndex), {...user.convos[convoIndex], messages: [...user.convos[convoIndex].messages, message] }, ...user.convos.slice(convoIndex + 1)]
    }

    // // Move the convo to the front of all of the convos (so that it will show first in the menu)
    // const convo = newConvos.splice(convoIndex, 1)
    // newConvos.unshift(convo[0]);

    // Update user state (so the menu updates) 
    setUserFunc({ ...user, convos: newConvos })
}