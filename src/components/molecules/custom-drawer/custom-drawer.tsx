import { Text } from "@rneui/themed";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { CustomDrawerProps } from "./types";
import images from "../../../theme/images";
import { DrawerStackProps } from "../../../navigation";
import { userService } from "../../../services";

export const CustomDrawer: React.FC<CustomDrawerProps> = () => {
    const userRef = useQuery(["user"], userService.getUser);
    const profilePic = useQuery(["profilePic"], userService.getProfilePic);

    const navigation = useNavigation<DrawerStackProps>();

    const _goToHome = () => navigation.navigate('Home');
    const _goToAboutUs = () => navigation.navigate('AboutUs');
    const _goToCharacters = () => navigation.navigate('Characters');
    const _goToAccount = () => navigation.navigate('Account');
    const _goToContactUs = () => navigation.navigate('ContactUs');

    return(
        <View style={tw`rounded-3xl bg-[#289d47e8] self-start mt-10 ml-2 h-[90%] w-[80%]`}>
        <View style={tw`bg-transparent border border-white mt-10 p-4 rounded-3xl mx-6`}>
          <TouchableOpacity style={tw`flex flex-row`} onPress={_goToAccount}>
            <Image source={{uri: `data:image/jpeg;base64,${profilePic.data?.data}`}} resizeMode="cover" style={tw`h-12 w-12 rounded-full border-2 border-white`}/>
            <View style={tw`ml-4`}>
              <Text style={tw`text-white text-lg`}>{userRef.data?.firstName ?? ''}</Text>
              <Text style={tw`text-white text-sm`}>{userRef.data?.email ?? ''}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={tw`flex flex-row mt-10 ml-12`} onPress={_goToHome}>
          <Image source={images.home} resizeMode="contain" style={tw`h-6 w-6`}/>
          <Text style={tw`text-white text-lg ml-6`}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex flex-row mt-10 ml-12`} onPress={_goToAboutUs}>
          <Image source={images.info} resizeMode="contain" style={tw`h-6 w-6`}/>
          <Text style={tw`text-white text-lg ml-6`}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex flex-row mt-10 ml-12`} onPress={_goToCharacters}>
          <Image source={images.characters} resizeMode="contain" style={tw`h-6 w-6`}/>
          <Text style={tw`text-white text-lg ml-6`}>Cast of Characters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex flex-row mt-10 ml-12`} onPress={_goToContactUs}>
          <Image source={images.contact} resizeMode="contain" style={tw`h-6 w-6`}/>
          <Text style={tw`text-white text-lg ml-6`}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    );
};