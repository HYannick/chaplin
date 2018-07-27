import axios from "axios/index";

export default (rootUrl, setHeader, autho) => {
  return {
    deleteCover(filename) {
      return axios.delete(`${rootUrl}/uploads/${filename}`, autho);
    },

    getSignedUrl() {
      return axios.get(`${rootUrl}/upload`, autho)
    },
  }
}