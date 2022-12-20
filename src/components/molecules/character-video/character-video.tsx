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
import { CharacterVideoProps } from "./types";

export const CharacterVideo: React.FC<CharacterVideoProps> = ({id, thumbnailId, heading, description, uploadedDate, duration}) => {
    const thumbnailRef = useQuery([{thumbnailId}], () => contentService.getThumbnail(thumbnailId));
    const contentRef = useQuery([id], () => contentService.getContentDetail(id));
    
    const navigation = useNavigation<AppStackProps>();
    const queryCache = useQueryClient();

    const timespan = contentRef.data?.data.content.content.duration;
    const [minutes, setMinutes] = useState<number>(0);
    const [isFavourited, setFavourited] = useState<boolean>(contentRef.data?.data.isFavourited);

    const favouriteVideo = () => {
        setFavourited(!isFavourited);
        contentService.favouriteVideo(contentRef.data?.data.content.content.id).then(() => {
            queryCache.refetchQueries({ queryKey: [id] })
        });
    };

    useEffect(() => {
        if (timespan) {
            const hms = timespan.split(':');
            setMinutes(parseInt((hms[0] * 60 + (hms[1]))));
        }
    }, [timespan]);
    
    return(
      <View style={tw`flex flex-row pb-4 border-b border-slate-300 mt-4`}>
        <ImageBackground source={{uri: `data:image/jpeg;base64,${thumbnailRef.data?.data}`}} resizeMode="cover" style={tw`h-37 w-28 justify-center shadow-xl`} imageStyle={tw`rounded-xl`}>
          <TouchableOpacity style={tw`bg-[#8b8b8b64] h-15 w-15 self-center rounded-full justify-center`} onPress={() => navigation.navigate("Content", {id: id })}>
            <View style={tw`bg-[#1fb469a4] h-[75%] w-[75%] self-center rounded-full justify-center`}>
              <Image source={images.play} resizeMode="contain" style={tw`h-[40%] w-[40%] self-center`}/>
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <View style={tw`flex px-4 w-[70%]`}>
          <View style={tw`flex flex-row mt-2`}>
            <Text style={tw`flex-1 text-base font-medium`}>{heading}</Text>
            <TouchableOpacity onPress={favouriteVideo}>
                <Icon name={isFavourited ? "bookmark" : "bookmark-o"} type="font-awesome" iconStyle={{fontSize: 20}}/>
            </TouchableOpacity>
          </View>
          <Text style={tw`text-xs mt-4 font-thin`}>{description}</Text>
          <Text style={tw`text-sm font-thin mt-auto mb-4`}>{uploadedDate.substring(0,10)} | {minutes} min</Text>
        </View>
      </View>
    )
}