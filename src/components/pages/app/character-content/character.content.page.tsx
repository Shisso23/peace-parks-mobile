import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';

import { AppStackPropsWithParams, DrawerStackProps } from "../../../../navigation";
import characterService from "../../../../services/sub-services/character-service/character.service";
import images from "../../../../theme/images";
import { CharacterVideo } from "../../../molecules/character-video/character-video";

export const CharacterContentPage: React.FC = () => {
    const route: AppStackPropsWithParams<"CharacterContent"> = useRoute<AppStackPropsWithParams<'CharacterContent'>>();
    const contentRef = useQuery(['characterVideos'], () => characterService.getCharacterContent(route.params?.id));

    const navigation = useNavigation<DrawerStackProps>();
    const _goToCharacters = () => navigation.navigate('Characters');
    
    const renderVideos = (itemData: { item: { id: string; thumbnailId: string; heading: string; description: string; uploadedDate: string; duration: string; }; }) => {
        return(
            <CharacterVideo
                id={itemData.item.id} 
                thumbnailId={itemData.item.thumbnailId} 
                heading={itemData.item.heading} 
                description={itemData.item.description} 
                uploadedDate={itemData.item.uploadedDate} 
                duration={itemData.item.duration}        
            />
        );
    };

    return(
        <SafeAreaView style={tw`bg-white h-full`}>
          <TouchableOpacity style={tw`ml-4 flex flex-row`} onPress={_goToCharacters}>
            <Image source={images.backArrow} resizeMode="cover" style={tw`h-4 w-4 mt-1`}/>
            <Image source={images.backPlaceholder} resizeMode="contain" style={tw`h-5 w-12 mt-0.5 ml-1`}/>
          </TouchableOpacity>
          <View style={tw`flex flex-row px-4 mt-8`}>
            <Image source={images.binoculars} resizeMode="contain" style={tw`h-8 w-8`}/>
            <Text style={tw`text-xl text-green-600 font-medium mt-1 ml-4`}>{contentRef.data?.data.character.name} {contentRef.data?.data.character.surname} Videos</Text>
          </View>
          <FlatList
            data={contentRef.data?.data.contents}
            renderItem={renderVideos}
            style={tw`px-4 mt-6`}
          />
        </SafeAreaView>
    )
}