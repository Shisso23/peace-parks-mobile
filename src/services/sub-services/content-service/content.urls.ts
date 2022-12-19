import appConfig from '../../../config';

const { hostUrl } = appConfig;

export default {
    thumbnailUrl: (id: string) => `${hostUrl}/User/Content/thumbnail/${id}`,
    dailyUpdateUrl: () => `${hostUrl}/User/Content?dailyUpdate=true`,
    contentDetailUrl: (id: string) => `${hostUrl}/User/Content/content-detail/${id}`,
    contentSearchUrl: (search: string) => `${hostUrl}/User/Content?search=${search}`,
    favouritesUrl: () => `${hostUrl}/User/Content/favourited-videos`,
    favouriteVideoUrl: (id: string) => `${hostUrl}/User/Content/favourite-video/${id}`,
    videoUrl: () => `${hostUrl}/User/Content/video/eeb152a3-6b41-4176-8d21-77ca23a3e213`,
    trackWatchedTimeUrl: (id: string) => `${hostUrl}/User/WatchedTime/${id}`,
}