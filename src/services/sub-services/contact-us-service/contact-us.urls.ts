import appConfig from '../../../config';

const { hostUrl } = appConfig;

export default {
    contactUsUrl: () => `${hostUrl}/User/ContactUs`,
}