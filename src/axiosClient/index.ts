import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { clearApplicationStorage, getApplicationStorage } from '@/utilities/storage';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});

axiosClient.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

const requestHandler = (request: InternalAxiosRequestConfig) => {

  const applicationStorage = getApplicationStorage();
  const token = applicationStorage?.tokenData.tokenId;

  if (typeof request.headers === 'undefined') {
    return request;
  }

  if (token) {
    request.headers['Authorization'] = 'Bearer ' + token;
  }

  return request;

}

const responseHandler = (response: AxiosResponse) => {
  return response;
}


const errorHandler = (error: AxiosError) => {

  const _error: any = error.response;

  if (!_error) {
    return error;
  }

  console.log(_error);

  if (_error.data.statusCode === 401) {
    clearApplicationStorage();
    return window.open(process.env.REACT_APP_DOMAIN_URL, '_self');
  }

  if (_error.data.statusCode !== 500) {
    return _error;
  }

  throw new Error(`Something went wrong. Internal server error: ${_error}`);

};