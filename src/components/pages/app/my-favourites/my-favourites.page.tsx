import { useNavigation } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react"
import { Image, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler";
import tw from 'twrnc';

import { AppStackProps } from "../../../../navigation";
import contentService from "../../../../services/sub-services/content-service/content.service";
import images from "../../../../theme/images";
import { ContentCard } from "../../../molecules/content-card/content-card";

export const MyFavouritesPage: React.FC = () => {
  const favouritesRef = useQuery(["favourites"], contentService.getFavourites);

  const appNavigation = useNavigation<AppStackProps>();
  const _goToAccount = () => appNavigation.navigate('Account');

  const renderFavourites = (itemData: { item: { id: string; thumbnailId: string; heading: string; description: string; uploadedDate: string; duration: string; }; }) => {
      return(
        <ContentCard 
        id={itemData.item.id} 
        thumbnailId={itemData.item.thumbnailId} 
        heading={itemData.item.heading} 
        description={itemData.item.description}
        uploadedDate={itemData.item.uploadedDate}
        duration={itemData.item.duration}
        />
      )
  }

  return (
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`flex flex-row px-5 mb-6`}>
          <TouchableOpacity style={tw`flex flex-row`} onPress={_goToAccount}>
            <Image source={images.backArrow} resizeMode="cover" style={tw`h-4 w-4 mt-1`}/>
            <Image source={images.backPlaceholder} resizeMode="contain" style={tw`h-5 w-12 mt-0.5 ml-1`}/>
          </TouchableOpacity>
          <Text style={tw`text-xl text-green-600 ml-[12%]`}>My Favourites</Text>
        </View>
        <FlatList
          data={favouritesRef.data?.data}
          keyExtractor={item => item.id}
          renderItem={renderFavourites}
          style={tw`px-5 pt-5`}
        />
      </SafeAreaView>
  )
}