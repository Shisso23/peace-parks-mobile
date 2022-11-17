import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import tw from 'twrnc';

import { TagProps } from "./type";

export const Tag: React.FC<TagProps> = ({title}) => {

    return(
        <View style={tw`bg-yellow-500 p-2 mr-2 text-white rounded-lg`}>
            <Text style={tw`text-white`}>{title}</Text>
        </View>
    )
}