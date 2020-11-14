import axios from 'axios';
import {LocalStore} from '../utils/storage';
import UserStore from '../store/UserStore';

const Api = axios.create({
  withCredentials: false,
  baseURL: 'http://194.67.90.67/api/v1',
  timeout: 60000,
  headers: {
    get: {
      Authorization: `Bearer ${LocalStore.getObject('bizkit_data').auth_token}`,
    },
    post: {
      Authorization: `Bearer ${LocalStore.getObject('bizkit_data').auth_token}`,
    },
    delete: {
      Authorization: `Bearer ${LocalStore.getObject('bizkit_data').auth_token}`,
    },
    put: {
      Authorization: `Bearer ${LocalStore.getObject('bizkit_data').auth_token}`,
    },
  },
});

Api.interceptors.request.use(
  config => {
    const token = UserStore.authToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

Api.interceptors.response.use(
  response => response,
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '400';
          break;
        case 401:
          err.message = '401';
          break;
        default:
          err.message = `(${err.response.status})!`;
      }
    } else {
      err.message = 'Unknown!';
    }

    return Promise.reject(err);
  },
);

export default Api;
