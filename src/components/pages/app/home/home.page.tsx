import React, { useEffect } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, View } from 'react-native';
import { Input, Text } from '@rneui/themed';
import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import tw from 'twrnc';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { exitAppOnHardwarePressListener } from '../../../../helpers';
import { useAppDispatch, signOutAction } from '../../../../reducers';
import { Colors } from '../../../../theme/variables';
import images from '../../../../theme/images';
import { Tag } from '../../../atoms/tag/tag';
import categoryService from '../../../../services/sub-services/category-service/category.service';
import { ContentCarousel } from '../../../molecules/content-carousel/content-carousel';
import contentService from '../../../../services/sub-services/content-service/content.service';
import { DrawerStackProps } from '../../../../navigation';

const { CancelToken } = axios;

export const HomePage: React.FC = () => {
  const requestSource = CancelToken.source();
  const dispatch = useAppDispatch();
  const categoriesRef: UseQueryResult<AxiosResponse<any, any>, unknown> = useQuery(["categories"], categoryService.getCategories);
  const dailyUpdateRef: UseQueryResult<AxiosResponse<any, any>, unknown> = useQuery(["dailyUpdate"], contentService.getDailyUpdate);
  const thumbnailRef: UseQueryResult<AxiosResponse<any, any>, unknown> = useQuery(["thumbnail", dailyUpdateRef?.data?.data ?? '',], () => contentService.getThumbnail(dailyUpdateRef.data?.data[0].thumbnailId));

  const _signOut = () => {
    dispatch(signOutAction());
  };

  useEffect(() => {
    return () => {
      requestSource.cancel();
    };
  });

  const getHeader = () => {
    return(
      <>
      <Text style={tw`text-green-600 text-lg mt-2 mb-2 ml-4`}>Genres</Text>
        <FlatList
          data={categoriesRef.data?.data}
          renderItem={({item}) =>  (
            <Tag title={item.name}/>
            )}
          keyExtractor={item => item.id}
          horizontal={true}
          style={tw`px-4`}/>
      </>
    )
  }

  useFocusEffect(exitAppOnHardwarePressListener);

  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <View style={tw`bg-white h-full pt-${screenHeight*0.015} pb-${screenHeight*0.01}`}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image source={images.drawerIcon} resizeMode="contain" style={tw`h-6 w-6 ml-3 mb-4 mt-4`}/>
      </TouchableOpacity>
      <View style={tw`px-4 bg-white`}>
        <View style={[tw`border-2 rounded-xl mb-10 pt-4 border-gray-200`]}>
          <Input
            style={[tw`rounded-lg bg-white my-1 mr-1 ml-8 h-0`]}
            placeholder="Search"
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.green}
            inputContainerStyle={tw`border-b-0 h-1 pl-2 pt-2`}
            leftIcon={<TextInput.Icon
              name="magnify"
              color={Colors.grey}
              style={tw`ml-8`}/>}
              />
        </View>
        <View style={{backgroundColor: Colors.transparent}}>
          <ImageBackground source={{uri: `data:image/jpeg;base64,${thumbnailRef.data?.data}`}} resizeMode="cover" style={tw`w-full h-${screenHeight*0.05}`} imageStyle={tw`rounded-lg`}>
            <View style={tw`bg-[#00000070] w-full h-${screenHeight*0.05} rounded-xl`}>
              <View style={[tw`bg-yellow-500 p-2 rounded-lg w-[32%] justify-center items-center absolute left-2 -top-3`, {transform: [{rotateZ: '-10deg'}]}]}>
                <Text style={tw`text-black`}>Today's Update</Text>
              </View>
              <View style={[tw`mt-auto ml-4 mb-6 w-[50%]`]}>
                <Text style={[tw`text-white font-semibold`]}>{dailyUpdateRef.data?.data[0].heading}</Text>
              </View>
              <View style={tw`bg-green-600 w-10 h-10 p-2 rounded-full justify-center items-center absolute right-6 -bottom-4 z-50`}>
                <Image source={images.play} resizeMode="contain" style={tw`w-4 h-4`}/>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <FlatList
        data={categoriesRef.data?.data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <>
          <View style={tw`flex flex-row mb-2 px-4`}>
              <Text style={tw`flex-1 text-green-600 text-lg mt-4 mb-2`}>{item.name}</Text>
              <TouchableOpacity style={tw`text-gray-400 mt-5.5 mb-2 ml-auto`}>
                <Text style={tw`text-gray-400 text-sm`}>Show More {'>'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={tw`mx-4`}>{item?.description}</Text>
            <ContentCarousel categoryId={item.id}/>
          </>
        )}  
        ListHeaderComponent={getHeader}
        style={tw`mt-5`}
      />
    </View>
  );
};

const screenHeight = Dimensions.get('screen').height;
