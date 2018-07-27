import axios from "axios/index";

export default (rootUrl, setHeader, autho) => {
  return {
    signin(data) {
      return axios.post(`${rootUrl}/signin`, data, autho)
    },
  }
}