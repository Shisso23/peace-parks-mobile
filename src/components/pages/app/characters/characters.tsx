import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';

import characterService from "../../../../services/sub-services/character-service/character.service";
import images from "../../../../theme/images";
import { CharacterInfo } from "../../../molecules/character-info/character-info";

export const CharactersPage: React.FC = () => {
    const drawerNavigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    const charactersRef = useQuery(['characters'], characterService.getCharacters);

    const renderCharacters = (itemData: { item: { id: string; name: string; surname: string; role: string; description: string; }; }) => {
      return(
        <CharacterInfo 
            id={itemData.item.id} 
            name={itemData.item.name} 
            surname={itemData.item.surname} 
            role={itemData.item.role} 
            description={itemData.item.description}/>

      );
    };

    return(
        <SafeAreaView style={tw`bg-white h-full`}>
          <TouchableOpacity onPress={() => drawerNavigation.toggleDrawer()}>
            <Image source={images.drawerIcon} resizeMode="contain" style={tw`h-6 w-6 ml-3 mb-4 mt-4`}/>
          </TouchableOpacity>
          <View style={tw`flex flex-row px-3 mt-2`}>
            <Image source={images.hatIcon} resizeMode="contain" style={tw`h-10 w-10`}/>
            <Text style={tw`text-lg text-green-600 font-medium mt-2 ml-4`}>MEET OUR CHARACTERS</Text>
          </View>
          <FlatList
            data={charactersRef.data?.data.character}
            renderItem={renderCharacters} 
            style={tw`px-2`}
          />
        </SafeAreaView>
    )
}