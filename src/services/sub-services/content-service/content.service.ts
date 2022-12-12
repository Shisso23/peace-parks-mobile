import RNFetchBlob from 'rn-fetch-blob';

import authNetworkService from '../auth-network-service/auth-network.service';
import contentUrls from './content.urls';
import storageService from '../storage-service/storage.service';

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

const getContentDetail = (id: string) => {
  const url = contentUrls.contentDetailUrl(id);

  return authNetworkService.get(url).catch((error) => {
      return Promise.reject(error);
  })
}

const searchContent = (search: string) => {
  const url = contentUrls.contentSearchUrl(search);

  return authNetworkService.get(url).catch((error) => {
      return Promise.reject(error);
  })
}

const getVideo: Function = async () => {
  const url = contentUrls.videoUrl();
  const accessToken = await storageService.getAccessToken();

  return RNFetchBlob.config({ fileCache: true, appendExt: 'mp4'}).
      fetch('GET', url, {
        accept: `*/*`,
        Authorization: `bearer ${accessToken}`,
    })
      .then(async (res) => {
        const status = res.info().headers;

        if(status !== 200) {
          throw new Error('Failed to download video.');
        }

        return `file:///${res.path()}`;
      });
};

  export default {
    getThumbnail,
    getDailyUpdate,
    getContentDetail,
    searchContent,
    getVideo,
  }