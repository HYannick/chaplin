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
    createUser(data) {
        return axios.post(`${rootUrl}/signup`, data, autho)
    },
    getUsers(token) {
        return axios.get(`${rootUrl}/users`, setHeader(token))
    },
    deleteUser(id) {
        return axios.delete(`${rootUrl}/users/${id}`, autho)
    },
    getUser(id, token) {
        return axios.get(`${rootUrl}/users/${id}`, setHeader(token))
    },
    updateUser(id, data) {
        return axios.put(`${rootUrl}/users/${id}/edit`, data, autho)
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

    deleteSubs(legacySubs, token) {
        return axios.post(`${rootUrl}/subscriptions/delete`, legacySubs, setHeader(token))
    },

    //MovieServices
    getMovies() {
        return axios.get(`${rootUrl}/movies`, autho)
    },
    getProposals() {
        return axios.get(`${rootUrl}/proposals`, autho);
    },
    postProposal(data) {
        return axios.post(`${rootUrl}/proposals`, data, autho);
    },
    likeProposal(id, userId, token) {
        return axios.put(`${rootUrl}/proposals/${id}`, { userId }, autho);
    },
    deleteProposal(id, userId) {
        return axios.delete(`${rootUrl}/proposals/${id}`, autho);
    },
    deleteCover(filename) {
        return axios.delete(`${rootUrl}/uploads/${filename}`, autho);
    },
    getDiffusedMovies(limit) {
        return axios.get(`${rootUrl}/movies/popular?limit=${limit}`, autho)
    },
    getUpcomingMovies(limit) {
        return axios.get(`${rootUrl}/movies/upcoming?limit=${limit}`, autho)
    },
    getRelatedMovies(related, genres) {
        return axios.get(`${rootUrl}/movies/${related}/related?genre[]=${genres}`, autho)
    },
    getFilteredMovies(filters) {
        const {genres, diffused, upcoming, language, orderedBy} = filters;
        return axios.get(`${rootUrl}/search?genres[]=${genres}&diffused=${diffused}&upcoming=${upcoming}&language=${language}`, autho)
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

    getScrapbooked(data) {
        return axios.post(`${rootUrl}/scrapbooking/`, data, autho)
    },
    getAnnounce() {
        return axios.get(`${rootUrl}/announce`, autho)
    },

    postAnnounce(data) {
        return axios.post(`${rootUrl}/announce/create`, data, autho)
    },
    updateAnnounce(id, data) {
        return axios.put(`${rootUrl}/announce/${id}`, data, autho)
    },
    removeAnnounce(id) {
        return axios.delete(`${rootUrl}/announce/${id}`, autho)
    },

    getEmails() {
        return axios.get(`${rootUrl}/newsletter/emails`, autho)
    },

    postEmail(data) {
        return axios.post(`${rootUrl}/newsletter/email/create`, data, autho)
    },

    removeEmail(id) {
        return axios.delete(`${rootUrl}/newsletter/email/${id}`, autho)
    },

    getMsg() {
        return axios.get(`${rootUrl}/chat/messages`, autho)
    },
    postMsg(data) {
        return axios.post(`${rootUrl}/chat/messages/create`, data, autho)
    }




}