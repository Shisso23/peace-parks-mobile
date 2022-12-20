import { Text } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';

import characterService from "../../../services/sub-services/character-service/character.service";
import { CharacterInfoProps } from "./types";

export const CharacterInfo: React.FC<CharacterInfoProps> = ({id, name, surname, role, description}) => {
    const characterRef = useQuery([id], () => characterService.getProfilePic(id))
    
    return(
        <View style={tw`flex flex-row mt-8 pb-6 border-b border-b-slate-300`}>
          <ImageBackground source={{uri: `data:image/jpeg;base64,${characterRef.data?.data}`}} resizeMode="cover" style={tw`h-35 w-27 rounded`}>
            <View style={[tw`w-full mt-auto bg-[#00000056] rounded-b-lg py-2`]}>
              <Text style={[tw`text-white self-center text-sm font-semibold`]}>{name} {surname}</Text>
            </View>
          </ImageBackground>
            <View style={tw`flex px-4 w-[70%]`}>
              <Text style={tw`text-sm font-medium`}>{role}</Text>
              <Text style={tw`text-sm mt-4`}>{description}</Text>
              <TouchableOpacity style={tw`bg-yellow-500 self-start ml-auto py-1.5 px-4 rounded-lg mt-auto`}>
                <Text style={tw`text-sm text-white font-medium self-center`}>Read More</Text>
              </TouchableOpacity>
            </View>
        </View>
    )
}