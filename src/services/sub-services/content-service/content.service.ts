import { AxiosResponse } from 'axios';
import { contentModel } from '../../../models/content/content.model';
import authNetworkService from '../auth-network-service/auth-network.service';
import contentUrls from './content.urls';

const getThumbnail = (id: string) => {
    const url = contentUrls.thumbnailUrl(id);
  
    return authNetworkService.get(url).catch((error) => { return Promise.reject(error)});
  };

const getDailyUpdate = () => {
    const url = contentUrls.dailyUpdateUrl();

    return authNetworkService.get(url).catch((error) => {
        return Promise.reject(error);
    })
}

  export default {
    getThumbnail,
    getDailyUpdate,
  }