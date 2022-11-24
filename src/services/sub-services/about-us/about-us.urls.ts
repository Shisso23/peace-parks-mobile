import appConfig from '../../../config';

const { hostUrl } = appConfig;

export default {
    aboutUsUrl: () => `${hostUrl}/User/AboutUs`,
    thumbnailUrl: (id: string | undefined) => `${hostUrl}/User/AboutUs/thumbnail/${id}`
}