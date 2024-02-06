const axios = require('axios');
require('dotenv').config();

const baseURL = process.env.BASE_URL


const api = axios.create({
    baseURL,
})

async function fetchData(endpoint){

    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error during request: ", error);
        throw error;
    }
}

function removeSpecialChars(word) {
    const safeWord = word.replace(/[^\w\s][\d]/gi, '');
    return safeWord;
}

async function showPlayers() {
    try {
        const players = await fetchData("/players.json")
        const playersOnline = players.length

        const infoData = await fetchData("/info.json")
        const serverData = infoData.vars
        const serverName = removeSpecialChars(serverData.sv_projectName)
        const maxPlayers = serverData.sv_maxClients

        console.log(`${playersOnline}/${maxPlayers} on ${serverName} right now!`)        
    } catch (error) {
        console.log("Error: ", error);
    }
}

showPlayers()