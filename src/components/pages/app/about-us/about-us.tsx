import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import React from "react";
import tw from 'twrnc'
import { View } from "react-native";

import { DrawerStackProps } from "../../../../navigation";

export const AboutUsPage: React.FC = () => {
    const navigation = useNavigation<DrawerStackProps>();
    const _goToHome = () => navigation.navigate('Home');

    return(
        <View style={tw`bg-blue-300 h-full`}>
          <Button title="Home" onPress={_goToHome}/>
        </View>
    )
}