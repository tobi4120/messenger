import { message, convo } from "../components/interfaces";

export const updateMenu = (convos: convo[], convoID: number, message: message, setConvosFunc: any) => {

    // Get the correct convo index from the user's convos
    const convoIndex = convos.findIndex(x => x.id === convoID) 

    // Append new message to user's convo messages
    let newConvos = convos;

    if (convoIndex > -1) {
        newConvos = [...convos.slice(0, convoIndex), {...convos[convoIndex], messages: [...convos[convoIndex].messages, message] }, ...convos.slice(convoIndex + 1)]
    }

    // Move the convo to the front of all of the convos (so that it will show first in the menu)
    const convo = newConvos.splice(convoIndex, 1)
    newConvos.unshift(convo[0]);

    // Update user state (so the menu updates) 
    setConvosFunc(newConvos);
}