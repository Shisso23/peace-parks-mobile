import appConfig from '../../../config';

const userBaseUrl = `${appConfig.apiUrl}/users`;

export default {
  userUrl: () => `${userBaseUrl}/show_details`,
};
