import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { Text } from "@rneui/themed";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';

import { AppStackProps } from "../../../navigation";
import contentService from "../../../services/sub-services/content-service/content.service";
import images from "../../../theme/images";
import { ContentCardProps } from "./types";

export const ContentCard: React.FC<ContentCardProps> = ({id, thumbnailId, heading, description, uploadedDate, duration}) => {
    const navigation = useNavigation<AppStackProps>();

    const thumbnailRef = useQuery([{thumbnailId}], () => contentService.getThumbnail(thumbnailId));

    const timespan = duration
    const [minutes, setMinutes] = useState<number>(0);

    const queryCache = useQueryClient();

    useEffect(() => {
        if(timespan != undefined){
            var hms = timespan.split(':');
            setMinutes(parseInt((+hms[0]*60+(hms[1]))));
        }
    }, [timespan]);

    const favouriteVideo = () => {
        contentService.favouriteVideo(id);
        queryCache.refetchQueries(["favourites"]);
    }

    return (
        <>
        <View style={tw`flex flex-row h-30 rounded-xl shadow-lg mb-4`}>
            <ImageBackground source={{uri: `data:image/jpeg;base64,${thumbnailRef.data?.data}`}} resizeMode="cover" style={tw`flex-1 justify-center rounded-tl-xl rounded-bl-xl`} imageStyle={tw`rounded-tl-xl rounded-bl-xl`}>
              <TouchableOpacity style={tw`bg-[#8b8b8b64] h-[40%] w-[40%] self-center rounded-full justify-center`} onPress={() => navigation.navigate("Content", {id: id })}>
                <View style={tw`bg-[#1fb469a4] h-[75%] w-[75%] self-center rounded-full justify-center`}>
                  <Image source={images.play} resizeMode="contain" style={tw`h-[40%] w-[40%] self-center`}/>
                </View>
              </TouchableOpacity>
            </ImageBackground>
            <View style={tw`flex-2 rounded-tr-xl rounded-br-xl bg-white`}>
              <View style={tw`flex flex-row`}>
                <Text style={tw`flex-1 text-lg ml-2 mt-3 font-medium`}>{heading}</Text>
                  <TouchableOpacity style={tw`mt-3 mr-2`} onPress={favouriteVideo}>
                    <Icon name="bookmark" type="font-awesome"/>
                  </TouchableOpacity>
              </View>
              <Text style={tw`text-xs ml-2 mt-2 text-gray-700`} numberOfLines={2}>{description}</Text>
              <Text style={tw`text-xs text-gray-700 ml-2 mt-auto mb-2`}>{uploadedDate.substring(0,10)} | {minutes} min</Text>
            </View>
        </View>
        </>
    )
}