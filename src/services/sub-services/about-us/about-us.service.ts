import authNetworkService from "../auth-network-service/auth-network.service";
import aboutUsUrls from "./about-us.urls"

const getAboutUs = () => {
    const url = aboutUsUrls.aboutUsUrl();

    return authNetworkService.get(url).catch((error) => {
        return Promise.reject(error);
    });
};

const getThumbnail = (id: string | undefined) => {
    const url = aboutUsUrls.thumbnailUrl(id);

    return authNetworkService.get(url).catch((error) => { 
        return Promise.reject(error)
    });
};

export default {
    getAboutUs,
    getThumbnail,
}