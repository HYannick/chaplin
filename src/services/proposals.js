import axios from "axios/index";

export default (rootUrl, setHeader, autho) => {
  return {
    getProposals() {
      return axios.get(`${rootUrl}/proposals`, autho);
    },
    postProposal(data) {
      return axios.post(`${rootUrl}/proposals`, data, autho);
    },
    likeProposal(id, userId) {
      return axios.put(`${rootUrl}/proposals/${id}`, {userId}, autho);
    },
    deleteProposal(id) {
      return axios.delete(`${rootUrl}/proposals/${id}`, autho);
    },
  }
}