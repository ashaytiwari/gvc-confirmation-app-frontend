import axios from 'axios';

import { errorHandler, requestHandler, responseHandler } from './handler';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL
});

axiosClient.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default axiosClient;