module.exports = {
    'rootUrl': (process.env.NODE_ENV === 'production') ? "https://chap-server.herokuapp.com/api" : "http://localhost:4001/api",
    'tokenId': localStorage.getItem('token')
}