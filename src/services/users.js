import axios from "axios/index";

export default (rootUrl, setHeader, autho) => {
  return {
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
  }
}