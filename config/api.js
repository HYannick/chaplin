const isProd = process.env.NODE_ENV === 'production';
module.exports = {
    'rootUrl': (isProd) ? "https://chap-server.herokuapp.com/api" : "http://localhost:4001/api",
    'ftpUrl': (isProd) ? "https://ayho.fr/uploads" : "http://localhost:4001/api/uploads",
    'tokenId': localStorage.getItem('token')
}