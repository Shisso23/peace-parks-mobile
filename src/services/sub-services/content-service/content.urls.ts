import appConfig from '../../../config';

const { hostUrl } = appConfig;

export default {
    thumbnailUrl: (id: string) => `${hostUrl}/User/Content/thumbnail/${id}`,
    dailyUpdateUrl: () => `${hostUrl}/User/Content?dailyUpdate=true`
}