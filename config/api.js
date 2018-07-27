const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  'socketUrl': (isProd) ? 'https://chap-server.herokuapp.com' : 'http://localhost:4001',
  'rootUrl': (isProd) ? 'https://chap-server.herokuapp.com/api' : 'http://localhost:4001/api',
  's3Url': 'https://s3.eu-west-3.amazonaws.com/montmeliancine',
  'pdfUrl': 'https://s3.eu-west-3.amazonaws.com/montmeliancine/pdf/programme.pdf',
  'tokenId': localStorage.getItem('token')
}