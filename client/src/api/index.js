import axios from 'axios'

var serverPort = process.env.REACT_APP_SERVER_PORT;

console.log("Server port " + serverPort);
// ! needs a port environment
const api = axios.create ({
    baseURL: `http://localhost:${serverPort}/user_api`,
});

const jwt = axios.create({
    baseURL: `http://localhost:${serverPort}/jwt_api`,
});

const nbaapi = axios.create({
    baseURL: `http://localhost:${serverPort}/nba_api`,
});

const cryptoapi = axios.create({
    baseURL: `http://localhost:${serverPort}/crypto_api`,
});

const unsplashapi = axios.create({
    baseURL: `http://localhost:${serverPort}/unsplash_api`,
});

const hearthstoneapi = axios.create({
    baseURL: `http://localhost:${serverPort}/hs_api`,
});

export const createUser = payload => api.post(`/user`, payload)
// export const getAllMovies = () => api.get(`/movies`)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const findUserById = id => api.get(`/user/by_id/${id}`)
export const findUserByUserName = userName => api.get(`/user/by_username/${userName}`)
export const authenticateUser = payload => api.post(`/authenticate_user`, payload)

// * google

export const createGoogleUser = payload => api.post(`/google_user`, payload)
export const connectGoogleUser = email => api.get(`/google_connect/${email}`)

// * jwt api
export const validateJWT = token => jwt.get(`/validate_jwt/${token}`);

// * nba api
export const getNBATeam = teamname => nbaapi.get(`/teams/${teamname}`);
export const getNBAPlayer = playername => nbaapi.get(`/players/${playername}`);
export const getNBAPlayerImageUrl = playername => nbaapi.get(`/player_url/${playername}`);

// * crypto api
// * take a payload, and use the params option of axios params: {...}
export const getCryptoValue = params => cryptoapi.get(`/currencies/`, {params: {cryptoID: params.cryptoID, targetCurrency: params.targetCurrency}});

// * unsplash api
export const searchPictures = query => unsplashapi.get(`/pictures/${query}`);

// * hearthstone api
export const searchCard = query => hearthstoneapi.get(`/cards/${query}`);

const apis = {
    // * user
    createUser,
    findUserById,
    findUserByUserName,
    authenticateUser,
    // *jwt
    validateJWT,
    //* google
    createGoogleUser,
    connectGoogleUser,
    // * nba
    getNBATeam,
    getNBAPlayer,
    getNBAPlayerImageUrl,
    // * crypto
    getCryptoValue,
    // * unsplash
    searchPictures,
    // * hearthstone
    searchCard
}

export default apis