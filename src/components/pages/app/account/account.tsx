import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "@rneui/themed";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import tw from 'twrnc';

import { AppStackProps, DrawerStackProps } from "../../../../navigation";
import { signOutAction, useAppDispatch, User } from "../../../../reducers";
import { userService } from "../../../../services";
import images from "../../../../theme/images";

export const AccountPage: React.FC = () => {
    const userRef: UseQueryResult<AxiosResponse<User, unknown>> = useQuery(["user"], userService.getUser);
    const profilePic: UseQueryResult<AxiosResponse<string, unknown>> = useQuery(["profilePic"], userService.getProfilePic);
    const dispatch = useAppDispatch();

    const _signOut = () => {
      dispatch(signOutAction());
    };
    
    const navigation: DrawerStackProps = useNavigation<DrawerStackProps>();
    const appNavigation: AppStackProps = useNavigation<AppStackProps>();
    const _goToHome = () => navigation.navigate('Home');
    const _goToProfile = () => appNavigation.navigate('Profile');

    return(
        <ScrollView style={tw`h-full bg-white px-5 py-5`}>
          <View style={tw`flex flex-row`}>
            <TouchableOpacity style={tw`flex flex-row flex-2 my-8`} onPress={_goToHome}>
              <Image source={images.backArrow} resizeMode="cover" style={tw`h-4 w-4 mt-1`}/>
              <Image source={images.backPlaceholder} resizeMode="contain" style={tw`h-5 w-12 mt-0.5 ml-1`}/>
            </TouchableOpacity>
            <Text style={tw`flex-3 my-7 text-xl text-green-600`}>Account</Text>
          </View>
          <Image source={{uri: `data:image/jpeg;base64,${profilePic.data?.data}`}} resizeMode="cover" style={tw`self-center mt-4 border-2 border-green-700 h-35 w-35 rounded-full`}/>
          <Text style={tw`self-center mt-4 mb-10 text-lg`}>{userRef.data?.firstName}</Text>
          <TouchableOpacity style={tw`flex flex-row p-4 bg-emerald-100  rounded-md mb-4`}>
            <Image source={images.favourites} resizeMode="contain" style={tw`h-5 w-5`}/>
            <Text style={tw`ml-4 text-sm text-gray-600`}>My Favourites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex flex-row p-4 bg-emerald-100 rounded-md mb-4`}>
            <Image source={images.downloads} resizeMode="contain" style={tw`h-5 w-5`}/>
            <Text style={tw`ml-4 text-sm text-gray-600`}>My Downloads</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex flex-row p-4 bg-emerald-100 rounded-md mb-4`} onPress={_goToProfile}>
            <Image source={images.settings} resizeMode="contain" style={tw`h-5 w-5`}/>
            <Text style={tw`ml-4 text-sm text-gray-600`}>Settings & Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex flex-row p-4 bg-emerald-100 rounded-md mb-4`}>
            <Image source={images.support} resizeMode="contain" style={tw`h-5 w-5`}/>
            <Text style={tw`ml-4 text-sm text-gray-600`}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex flex-row p-4 bg-emerald-100 rounded-md mb-4`} onPress={_signOut}>
            <Image source={images.signOut} resizeMode="contain" style={tw`h-5 w-5`}/>
            <Text style={tw`ml-4 text-sm text-gray-600`}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
    )
}