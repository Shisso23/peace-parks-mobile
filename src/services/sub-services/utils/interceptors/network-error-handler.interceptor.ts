import _ from 'lodash';
import { AxiosError, AxiosInstance } from 'axios';

import { ClientNetworkError, ServerNetworkError, ServerUnavailable } from '../../../exceptions';

const createNetworkErrorHandlerInterceptor = (axiosInstance: AxiosInstance) => {
  const _serverResponded = (error: AxiosError) => error.response;
  const _serverSideError = (statusCode: number) => statusCode >= 500;
  const _clientSideError = (statusCode: number) => statusCode >= 400;
  const _noResponseFromServer = (error: AxiosError) => error.request;

  return axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      let exception;

      if (_serverResponded(error)) {
        const statusCode = _.get(error, 'response.status');
        if (_serverSideError(statusCode)) {
          exception = new ServerNetworkError(statusCode, error.response.data);
        } else if (_clientSideError(statusCode)) {
          exception = new ClientNetworkError(statusCode, error.response.data);
        } else {
          exception = new ServerUnavailable('Server is probably offline');
        }
      } else if (_noResponseFromServer(error)) {
        exception = new ServerUnavailable('Server is probably offline');
      } else {
        exception = new Error('Something terrible happened');
      }

      // eslint-disable-next-line no-console
      console.warn(exception);
      return Promise.reject(exception);
    },
  );
};
export default createNetworkErrorHandlerInterceptor;
