import appConfig from '../../../config';

const { hostUrl } = appConfig;

export default {
    categoriesUrl: () => `${hostUrl}/User/Category`,
    categoryContentUrl: (id: string) => `${hostUrl}/User/Category/category-content/${id}`
}