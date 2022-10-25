import  axios from 'axios';
import { cookieService, parseAxiosError } from '../utils';

export const axiosInstance = axios.create({
    baseURL: '/api/v1/',
    timeout: 1000,
    headers: {
      "Content-Type": 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": true,
    }
  });



// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
// Do something before request is sent
  let token = cookieService.get('token');
  let headers = token ? {
    Authorization: token
  } : {}
  config.headers = { 
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...headers
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(parseAxiosError(error));
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(parseAxiosError(error));
});

export default axiosInstance;