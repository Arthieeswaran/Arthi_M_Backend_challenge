import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/players';

const PlayerService = {
    getAllPlayers: () => {
        return axios.get(BASE_URL);
    },
    getPlayerById: (playerId) => {
        return axios.get(`${BASE_URL}/${playerId}`);
    },
    createPlayer: (playerData) => {
        return axios.post(BASE_URL, playerData);
    },
    updatePlayer: (playerId, playerData) => {
        return axios.put(`${BASE_URL}/${playerId}`, playerData);
    },
    deletePlayer: (playerId) => {
        return axios.delete(`${BASE_URL}/${playerId}`);
    },
    getPlayersByState: (stateName) => {
        return axios.get(`${BASE_URL}/state/${stateName}`);
    }
};

export default PlayerService;