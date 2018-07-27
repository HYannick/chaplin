import axios from "axios/index";

export default (rootUrl, setHeader, autho) => {
  return {
    getEmails() {
      return axios.get(`${rootUrl}/newsletter/emails`, autho)
    },

    postEmail(data) {
      return axios.post(`${rootUrl}/newsletter/email/create`, data, autho)
    },

    removeEmail(id) {
      return axios.delete(`${rootUrl}/newsletter/email/${id}`, autho)
    }
  }
}