import appConfig from '../../../config';

const { hostUrl } = appConfig;
export default {
  tokenUrl: () => `${hostUrl}/Token`,
  registerUrl: () => `${hostUrl}/UserRegistrations`,
  confirmationUrl: (regId: any) => `${hostUrl}/UserRegistrations/${regId}/confirm`,
  forgotPasswordUrl: () => `${hostUrl}/users/password`,
};
