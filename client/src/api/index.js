import axios from 'axios'

var serverHost = process.env.REACT_APP_SERVER_HOST;
var clientPort = process.env.REACT_APP_CLIENT_PORT;
var serverPort = process.env.REACT_APP_SERVER_PORT;

console.log("Server port " + serverPort);
// ! needs a port environment
const api = axios.create ({
    baseURL: `http://localhost:${clientPort}/api/user_api`,
});

const jwt = axios.create({
    baseURL: `http://localhost:${clientPort}/api/jwt_api`,
});

const nbaapi = axios.create({
    baseURL: `http://localhost:${clientPort}/api/nba_api`,
});

const cryptoapi = axios.create({
    baseURL: `http://localhost:${clientPort}/api/crypto_api`,
});

const unsplashapi = axios.create({
    baseURL: `http://localhost:${clientPort}/api/unsplash_api`,
});

const hearthstoneapi = axios.create({
    baseURL: `http://localhost:${clientPort}/api/hs_api`,
});

const quotesapi = axios.create({
    baseURL: `http://localhost:${clientPort}/api/quotes_api`,
});

const prefsapi = axios.create({
    baseURL: `http://localhost:${clientPort}/api/prefs_api`,
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
export const getCryptoValue = params => cryptoapi.get(`/currencies/${params.cryptoID}&${params.targetCurrencyID}`);
export const getCurrencyOptions = () => cryptoapi.get(`/currencyOptions`);
export const getOnlyCryptoOptions = () => cryptoapi.get(`/onlyCryptoOptions`);

// * unsplash api
export const searchPictures = query => unsplashapi.get(`/pictures/${query}`);

// * hearthstone api
export const searchCard = query => hearthstoneapi.get(`/cards/${query}`);

//* quotes api
export const searchQuote = query => quotesapi.get(`/quotes/${query}`);
export const searchQuoteByTag = tag => quotesapi.get(`/quotes-tag/${tag}`);

//* prefs api
export const getUserPrefs = token => prefsapi.get(`/prefs/${token}`);
export const setUserPrefs = payload => prefsapi.post(`/prefs`, payload);
export const updateUserPrefs = payload => prefsapi.put(`/update_prefs`, payload);

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
    getCurrencyOptions,
    getOnlyCryptoOptions,
    // * unsplash
    searchPictures,
    // * hearthstone
    searchCard,
    // * quotes
    searchQuote,
    searchQuoteByTag,
    // * prefs
    getUserPrefs,
    setUserPrefs,
    updateUserPrefs
}

export default apis