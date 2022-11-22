import { Text } from "@rneui/themed";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

import contentService from "../../../services/sub-services/content-service/content.service";
import { VideoThumbnailProps } from "./type";
import { AppStackProps } from "../../../navigation";

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({thumbnailId, title, id}) => {
    const thumbnailRef = useQuery([{thumbnailId}], () => contentService.getThumbnail(thumbnailId));
    const navigation = useNavigation<AppStackProps>();

    return (
        <TouchableOpacity onPress={()=> navigation.navigate("Content", {id: id })}>
          <ImageBackground source={{uri: `data:image/jpeg;base64,${thumbnailRef.data?.data}`}} resizeMode="cover" style={tw`w-25 h-40 mt-5 mr-4`} imageStyle={tw`rounded-lg`}>
            <View style={[tw`w-full mt-auto bg-[#00000056] rounded-b-lg py-2`]}>
              <Text style={[tw`text-white self-center text-xs font-semibold`]}>{title}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
    );
};