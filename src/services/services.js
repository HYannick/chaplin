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
    //UserServices
    signin(data) {
        return axios.post(`${rootUrl}/signin`, data, autho)
    },
    getUsers() {
        return axios.get(`${rootUrl}/users`, autho)
    },

    getUser(id, token) {
        return axios.get(`${rootUrl}/users/${id}`, setHeader(token))
    },

    //SubscriptionServices
    subscribeTo(data, token) {
        return axios.post(`${rootUrl}/subscribe`, data, setHeader(token))
    },

    getSubscriptions(token) {
        return axios.get(`${rootUrl}/subscriptions`, setHeader(token))
    },

    getUserSubscription(id, token) {
        return axios.get(`${rootUrl}/user/${id}/subscriptions`, setHeader(token))
    },
    getMovieSubscription(id, date, time, token) {
        return axios.get(`${rootUrl}/movie/${id}/subscription?date=${date}&time=${time}`, setHeader(token))
    },
    getMovieSubscriptions(id, token) {
        return axios.get(`${rootUrl}/movie/${id}/subscriptions`, setHeader(token))
    },

    //MovieServices
    getMovies() {
        return axios.get(`${rootUrl}/movies`, autho)
    },
    getDiffusedMovies() {
        return axios.get(`${rootUrl}/movies/popular`, autho)
    },
    getUpcomingMovies() {
        return axios.get(`${rootUrl}/movies/upcoming`, autho)
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



}