import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "@rneui/themed";
import React from "react";
import tw from 'twrnc'
import { Image, ImageBackground, Linking, Touchable, TouchableOpacity, View } from "react-native";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ScrollView } from "react-native-gesture-handler";
import { AxiosResponse } from "axios";

import { DrawerStackProps } from "../../../../navigation";
import images from "../../../../theme/images";
import aboutUsService from "../../../../services/sub-services/about-us/about-us.service";
import { AboutUs } from "../../../../models/about-us/types";

export const AboutUsPage: React.FC = () => {
    const aboutUsRef: UseQueryResult<AxiosResponse<AboutUs, unknown>> = useQuery(["AboutUs"], aboutUsService.getAboutUs);
    const thumbnailRef: UseQueryResult<AxiosResponse<string, unknown>> = useQuery(["AboutUsThumbnail", aboutUsRef?.data?.data ?? '',], () => aboutUsService.getThumbnail(aboutUsRef.data?.data.id));
    
    const navigation = useNavigation<DrawerStackProps>();
    const _goToHome = () => navigation.navigate('Home');

    const _visitWebsite = () => Linking.canOpenURL("https://www.peaceparks.org/").then(() => {
      Linking.openURL("https://www.peaceparks.org/");
    })

    return(
        <View style={tw`bg-white h-full pb-6`}>
          <ImageBackground source={{uri: `data:image/jpeg;base64,${thumbnailRef.data?.data}`}} resizeMode="cover" style={tw`flex-1 h-full`}>
            <View style={tw`h-full bg-[#00000032]`}>
            <TouchableOpacity style={tw`mt-12 ml-4`} onPress={_goToHome}>
              <Image source={images.back} resizeMode="contain" style={tw`h-8 w-14`}/>
            </TouchableOpacity>
              <Text style={tw`mt-auto mb-4 ml-4 text-white text-xl`}>The Story of Peace Parks</Text>
            </View>
          </ImageBackground>
          <ScrollView style={tw`flex-1`}>
            <Text style={tw`mt-8 mb-4 ml-5 text-xl`}>About Us</Text>
            <Text style={tw`mb-4 ml-4 text-sm`}>{aboutUsRef.data?.data.description}</Text>
            <Text style={tw`mt-2 ml-4 text-xl`}>Learn more at Peaceparks.org.</Text>
            <TouchableOpacity style={tw`mt-6 mb-8 mx-4 bg-yellow-500 p-2 rounded-lg`} onPress={_visitWebsite}>
              <Text style={tw`text-white text-lg self-center`}>Visit our main website</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    )
}