import { AxiosResponse } from 'axios';

import { User, userModel } from '../../../reducers/user-reducer';
import authNetworkService from '../auth-network-service/auth-network.service';
import userUrls from './user.urls';
import { userDto } from './userDto';

const getUser = () => {
  const url = userUrls.userUrl();
  const _createAndReturnUserModel = (apiResponse: AxiosResponse) => userModel(apiResponse.data);

  return authNetworkService
    .get(url)
    .then(_createAndReturnUserModel)
    .catch((error) => {
      return Promise.reject(error);
    });
};

const updateUser = (formData: User) => {
  const url = userUrls.userUrl();
  const apiUser = userDto(formData);

  return authNetworkService.patch(url, apiUser).catch((error) => {
    error.errors = userModel(error.errors);
    return Promise.reject(error);
  });
};

export default {
  getUser,
  updateUser,
};
