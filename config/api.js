const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  'socketUrl': (isProd) ? "https://chap-server.herokuapp.com" : "http://localhost:4001",
  'rootUrl': (isProd) ? "https://chap-server.herokuapp.com/api" : "http://localhost:4001/api",
  'ftpUrl': (isProd) ? "https://s3.eu-west-3.amazonaws.com/montmeliancine" : "https://s3.eu-west-3.amazonaws.com/montmeliancine",
  'pdfUrl': (isProd) ? "https://ayho.fr/uploads/pdf/programme.pdf" : "http://localhost:4001/api/program",
  'tokenId': localStorage.getItem('token')
}