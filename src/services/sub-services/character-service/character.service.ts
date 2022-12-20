import authNetworkService from "../auth-network-service/auth-network.service";
import characterUrls from "./character.urls";


const getProfilePic = (id: string) => {
  const url = characterUrls.characterPicUrl(id);
  
  return authNetworkService.get(url).catch((error) => { return Promise.reject(error)});
};

const getCharacterContent = (id: string) => {
  const url = characterUrls.characterContentUrl(id);

  return authNetworkService.get(url).catch((error) => {
      return Promise.reject(error);
  });
};

const getCharacters = () => {
  const url = characterUrls.charactersUrl();
  
  return authNetworkService.get(url).catch((error) => { return Promise.reject(error)});
};

export default {
    getProfilePic,
    getCharacterContent,
    getCharacters,
}