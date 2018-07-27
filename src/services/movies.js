import axios from "axios/index";

export default (rootUrl, setHeader, autho) => {
  return {
    getMovies() {
      return axios.get(`${rootUrl}/movies`, autho)
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
    }
  }
}