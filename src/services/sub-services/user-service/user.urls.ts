import appConfig from '../../../config';

const { hostUrl } = appConfig;

export default {
  userUrl: () => `${hostUrl}/AuthenticatedUser`,
  profilePicUrl: () => `${hostUrl}/AuthenticatedUser/profile-pic`,
};
