import _ from 'lodash';

import {
  LoginValueProps,
  registerModel,
  RegisterValueProps,
  ForgotPasswordValueProps,
} from '../../../components';
import networkService from '../network-service/network.service';
import authUrls from './user-auth.urls';
import authUtils from './user-auth.utils';
import { registerDto } from './user-auth.dto';

const login = (formData: LoginValueProps) => {
  const signInUrl = authUrls.tokenUrl();
  const oAuthData = authUtils.constructOAuthSignInData(formData);

  return networkService.postForm(signInUrl, oAuthData).then(authUtils.storeAccessAndRefreshTokens);
};

const logout = () => {
  return authUtils.removeAccessAndRefreshTokens();
};

const register = (formData: RegisterValueProps) => {
  const registerUrl = authUrls.registerUrl();
  const apiDto = registerDto(formData);

  return networkService.post(registerUrl, apiDto).then((token) => networkService.patch(authUrls.confirmationUrl(token.data))).catch((err) => {
    err.errors = registerModel(err.errors);
    return Promise.reject(err);
  });
};

const forgotPassword = (formData: ForgotPasswordValueProps) => {
  const forgotPasswordUrl = authUrls.forgotPasswordUrl();

  return networkService.post(forgotPasswordUrl, formData).catch((err) => {
    return Promise.reject(err);
  });
};

const doTokensExistInLocalStorage = () => {
  const _trueIfBothExist = (accessToken: string, refreshToken: string) =>
    !_.isNull(accessToken) && !_.isNull(refreshToken);

  return authUtils
    .getAccessAndRefreshTokens()
    .then(([accessToken, refreshToken]) => _trueIfBothExist(accessToken, refreshToken));
};

export default {
  login,
  logout,
  register,
  forgotPassword,
  doTokensExistInLocalStorage,
};
