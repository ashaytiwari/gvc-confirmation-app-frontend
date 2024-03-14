import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

import messages from "@/constants/messages";

import { clearApplicationStorage, getApplicationStorage } from "@/utilities/storage";

export const requestHandler = (request: InternalAxiosRequestConfig) => {

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

export const responseHandler = (response: AxiosResponse) => {
  return response;
}


export const errorHandler = (error: AxiosError) => {

  const _error: any = error.response;

  if (!_error) {
    return error;
  }

  if (_error.data.statusCode === 401) {
    clearApplicationStorage();
    toast.error(messages.sessionExpired);
    return window.open(process.env.NEXT_PUBLIC_DOMAIN_URL, '_self');
  }

  if (_error.data.statusCode === 422) {
    handleUnprocessableEntityErrors(_error.data);
    return _error;
  }

  if (_error.data.statusCode !== 500) {
    return _error;
  }

  throw new Error(`Something went wrong. Internal server error: ${_error}`);

};

function handleUnprocessableEntityErrors(errors: any) {
  const errorMessage = errors.data[0]?.msg;
  toast.error(errorMessage);
}