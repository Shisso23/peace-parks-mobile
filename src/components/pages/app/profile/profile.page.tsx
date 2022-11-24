import { Text } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';

import { userService } from '../../../../services';
import images from '../../../../theme/images';
import { ProfileForm } from '../../../molecules';
import { FormScreenPeaceParks } from '../../../peaceparkss';
import { AppStackProps } from '../../../../navigation';

export const ProfilePage: React.FC = () => {
  const userRef = useQuery(["user"], userService.getUser);
  const profilePic = useQuery(["profilePic"], userService.getProfilePic);

  const appNavigation = useNavigation<AppStackProps>();
  const _goToAccount = () => appNavigation.navigate('Account');


  const constructFormData = (image: ImageOrVideo) => {
    let form = new FormData();
    form.append('file',{
      uri: image.path,
      type: image.mime,
      name: image.filename ? image.filename : 'default.jpeg',
    });
    return form;
  };
  
  const addImage = () => {
      setTimeout(() => {
        ImagePicker.openPicker({
          width: 100,
          height: 100,
          compressImageQuality: 0.8,
          cropping: true,
          imagePicking: true,
          includeBase64: true,
        }).then(async (image) => {
          await userService.changeProfilePic(constructFormData(image));
        });
      }, 100);
    };

  return (
  <FormScreenPeaceParks contentContainerStyle={tw`bg-white px-5 py-5`}>
      <View style={tw`flex flex-row`}>
        <TouchableOpacity style={tw`flex flex-row my-8`} onPress={_goToAccount}>
          <Image source={images.backArrow} resizeMode="cover" style={tw`h-4 w-4 mt-1`}/>
          <Image source={images.backPlaceholder} resizeMode="contain" style={tw`h-5 w-12 mt-0.5 ml-1`}/>
        </TouchableOpacity>
        <Text style={tw`my-7 text-xl text-green-600 ml-[20%]`}>Settings</Text>
      </View>
      <Image source={{uri: `data:image/jpeg;base64,${profilePic.data?.data}`}} style={[{resizeMode: 'cover', width: 150, height: 150, borderRadius: 150/2 }, tw`self-center mt-4 border-2 border-gray-300`]}/>
       <View style={[tw`bg-white self-center absolute top-55 left-58 rounded-full p-2 border-2 border-green-300`]}>
        <TouchableOpacity onPress={addImage}>
          <Image source={images.camera} style={{resizeMode: 'contain', width: 20, height: 20}}/>
        </TouchableOpacity>
       </View>
      <Text style={tw`self-center mt-4 mb-10 text-lg`}>{userRef.data?.firstName}</Text>
      <ProfileForm />
    </FormScreenPeaceParks>
)};
