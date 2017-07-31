import axios from 'axios';
import api from '../../config/api';
const { rootUrl, tokenId } = api;
const autho = {
    headers: {
        'authorization': tokenId
    }
};

const setHeader = (token) => {
    return {
        headers: {
            'authorization': tokenId || token
        }
    }
};

export default {
    getUsers() {
        return axios.get(`${rootUrl}/users`, autho)
    },

    getUser(id, token) {
        return axios.get(`${rootUrl}/users/${id}`, setHeader(token))
    },

    subscribeTo(data, token) {
        return axios.post(`${rootUrl}/subscribe`, data, setHeader(token))
    },

    getSubscriptions() {
        return axios.get(`${rootUrl}/subscribe`, data, setHeader(token))
    },

    getUserSubscription(id, token) {
        return axios.get(`${rootUrl}/user/${id}/subscriptions`, setHeader(token))
    },
    getMovieSubscription(id, date, time, token) {
        return axios.get(`${rootUrl}/movie/${id}/subscription?date=${date}&time=${time}`, setHeader(token))
    },
    getMovieSubscriptions(id, date, time, token) {
        return axios.get(`${rootUrl}/movie/${id}/subscriptions`, setHeader(token))
    },
    getMovies() {
        return axios.get(`${rootUrl}/movies`, autho)
    },
    getDiffusedMovies() {
        return axios.get(`${rootUrl}/movies/popular`, autho)
    },

    getMovie(id) {
        return axios.get(`${rootUrl}/movies/${id}`, autho)
    },

    postMovie(data) {
        return axios.post(`${rootUrl}/movies/create`, data, autho)
    },
    updateMovie(id, data) {
        return axios.put(`${rootUrl}/movies/${id}`, data, autho)
    },
    removeMovie(id) {
        return axios.delete(`${rootUrl}/movies/${id}`, autho)
    },

    signin(data) {
        return axios.post(`${rootUrl}/signin`, data, autho)
    }


}