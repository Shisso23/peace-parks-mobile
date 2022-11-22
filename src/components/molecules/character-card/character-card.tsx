import { Text } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';

import characterService from "../../../services/sub-services/character-service/character.service";
import { CharacterCardProps } from "./types";

export const CharacterCard: React.FC<CharacterCardProps> = ({id, name, surname, role, location}) => {
    const characterRef = useQuery([id], () => characterService.getProfilePic(id))

    return (
        <>
        <TouchableOpacity style={tw`flex flex-row`}>
        <Image source={{uri: `data:image/jpeg;base64,${characterRef.data?.data}`}} resizeMode="cover" style={tw`h-14 w-24 rounded-lg mx-2 my-2`}/>
            <View style={tw`my-2 pr-2 mr-4`}>
                <Text style={tw`text-lg`}>{name} {surname}</Text>
                <Text style={tw`text-sm`}>{role} - {location}</Text>
            </View>
        </TouchableOpacity>
        </>
    )
}