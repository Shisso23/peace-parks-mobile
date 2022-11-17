import { AxiosResponse } from "axios";
import { err } from "react-native-svg/lib/typescript/xml";

import authNetworkService from '../auth-network-service/auth-network.service';
import categoryUrls from "./category.urls";

const getCategories = () => {
    const url = categoryUrls.categoriesUrl();

    return authNetworkService.get(url).catch((error) => {
        return Promise.reject(error);
    })
}

const getCategory = (id: string) => {
    const url = categoryUrls.categoryContentUrl(id);

    return authNetworkService.get(url).catch((error) => {
        return Promise.reject(error);
    });
};

export default {
    getCategories,
    getCategory,
};