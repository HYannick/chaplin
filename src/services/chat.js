import axios from "axios/index";

export default (rootUrl, setHeader, autho) => {
  return {
    getMsg() {
      return axios.get(`${rootUrl}/chat/messages`, autho)
    },
    postMsg(data) {
      return axios.post(`${rootUrl}/chat/messages/create`, data, autho)
    },
  }
}