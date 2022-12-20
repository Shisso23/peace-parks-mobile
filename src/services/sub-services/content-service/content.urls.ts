import appConfig from '../../../config';

const { hostUrl } = appConfig;

export default {
    thumbnailUrl: (id: string) => `${hostUrl}/User/Content/thumbnail/${id}`,
    dailyUpdateUrl: () => `${hostUrl}/User/Content?dailyUpdate=true`,
    contentDetailUrl: (id: string) => `${hostUrl}/User/Content/content-detail/${id}`,
    contentSearchUrl: (search: string) => `${hostUrl}/User/Content?search=${search}`,
    favouritesUrl: () => `${hostUrl}/User/Content/favourited-videos`,
    favouriteVideoUrl: (id: string) => `${hostUrl}/User/Content/favourite-video/${id}`,
    videoUrl: (id: string) => `${hostUrl}/User/Content/video/${id}`,
    trackWatchedTimeUrl: (id: string) => `${hostUrl}/User/WatchedTime/${id}`,
    likeVideoUrl: (id: string) => `${hostUrl}/User/Content/like-video/${id}`,
}