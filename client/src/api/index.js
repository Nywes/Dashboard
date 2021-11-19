import axios from 'axios'

var serverPort = process.env.REACT_APP_SERVER_PORT;

console.log("Server port " + serverPort);
// ! needs a port environment
const api = axios.create({
    baseURL: `http://localhost:${serverPort}/api`,
});

export const createUser = payload => api.post(`/user`, payload)
// export const getAllMovies = () => api.get(`/movies`)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const findUserById = id => api.get(`/user/by_id/${id}`)
export const findUserByUserName = userName => api.get(`/user/by_username/${userName}`)

const apis = {
    createUser,
    findUserById,
    findUserByUserName
    // getAllMovies,
    // updateMovieById,
    // deleteMovieById,
    // getMovieById,
}

export default apis