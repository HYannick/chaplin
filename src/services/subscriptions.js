import axios from "axios/index";

export default (rootUrl, setHeader) => {
  return {
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
  }
}