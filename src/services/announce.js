import axios from "axios/index";

export default (rootUrl, setHeader, autho) => {
  return {
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
  }
}