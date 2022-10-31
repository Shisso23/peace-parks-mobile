import _ from 'lodash';

import { LoginValueProps } from '../../../components';
import storageService from '../storage-service/storage.service';
import appConfig from '../../../config';

const storeAccessAndRefreshTokens = (apiResponse: Object) => {
  const accessToken = _.get(apiResponse, 'data.token', null);
  console.log(accessToken);
  return Promise.all([
    storageService.storeAccessToken(accessToken),
  ]);
};

const removeAccessAndRefreshTokens = () =>
  Promise.all([storageService.removeAccessToken(), storageService.removeRefreshToken()]);

const getAccessAndRefreshTokens = () =>
  Promise.all([storageService.getAccessToken(), storageService.getRefreshToken()]);

const constructOAuthSignInData = ({ email, password }: LoginValueProps) => ({
  email,
  password,
});

const constructOAuthTokenRefreshData = () =>
  storageService.getRefreshToken().then((refreshToken: string) => ({
    grant_type: 'refresh_token',
    client_id: appConfig.clientId,
    client_secret: appConfig.clientSecret,
    refresh_token: refreshToken,
  }));

export default {
  storeAccessAndRefreshTokens,
  constructOAuthSignInData,
  constructOAuthTokenRefreshData,
  removeAccessAndRefreshTokens,
  getAccessAndRefreshTokens,
};
