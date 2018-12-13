import axios from "axios/index";

export default (rootUrl, setHeader, autho) => {
  return {
    deleteCover(filename) {
      return axios.delete(`${rootUrl}/upload/${filename}`, autho);
    },

    deleteImageSet(imageSet) {
      return axios.post(`${rootUrl}/upload/delete`, imageSet, autho);
    },

    getSignedUrl() {
      return axios.get(`${rootUrl}/upload`, autho)
    },
  }
}
