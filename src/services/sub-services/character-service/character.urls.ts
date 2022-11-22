import appConfig from '../../../config';

const { hostUrl } = appConfig;

export default {
    characterPicUrl: (id: string) => `${hostUrl}/User/Character/profile-pic/${id}`,
}