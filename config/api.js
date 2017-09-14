const isProd = process.env.NODE_ENV === 'production';
module.exports = {
    'socketUrl': (isProd) ? "https://chap-server.herokuapp.com" : "http://localhost:4001",
    'rootUrl': (isProd) ? "https://chap-server.herokuapp.com/api" : "http://localhost:4001/api",
    'ftpUrl': (isProd) ? "https://ayho.fr/uploads" : "http://localhost:4001/api/uploads",
    'pdfUrl': (isProd) ? "https://ayho.fr/uploads/pdf/programme.pdf" : "http://localhost:4001/api/program",
    'tokenId': localStorage.getItem('token')
}