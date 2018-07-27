import api from '../../config/api';
import UserService from './users'
import SubscriptionService from './subscriptions'
import MovieService from './movies'
import ProposalService from './proposals'
import AnnounceService from './announce'
import NewsletterService from './newsletter'
import UploadService from './upload'
import ChatService from './chat'
import AuthServices from './auth'
const {rootUrl, tokenId} = api;
const autho = {
  headers: {
    'authorization': tokenId
  }
};

const setHeader = (token) => {
  return {
    headers: {
      'authorization': tokenId || token
    }
  }
};

export default {
  auth: AuthServices(rootUrl,setHeader, autho),
  users: UserService(rootUrl, setHeader, autho),
  subscriptions: SubscriptionService(rootUrl, setHeader),
  movies: MovieService(rootUrl, setHeader, autho),
  proposals: ProposalService(rootUrl, setHeader, autho),
  announces: AnnounceService(rootUrl, setHeader, autho),
  newsletters: NewsletterService(rootUrl, setHeader, autho),
  uploads: UploadService(rootUrl, setHeader, autho),
  chat: ChatService(rootUrl, setHeader, autho),
}