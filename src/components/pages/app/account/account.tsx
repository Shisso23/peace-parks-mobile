import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import React from "react";

import { AppStackProps, DrawerStackProps } from "../../../../navigation";

export const AccountPage: React.FC = () => {
    const navigation = useNavigation<DrawerStackProps>();
    const appNavigation = useNavigation<AppStackProps>();
    const _goToHome = () => navigation.navigate('Home');
    const _goToProfile = () => appNavigation.navigate('Profile');

    return(
        <>
          <Button title="Home" onPress={_goToHome}/>
          <Button title="Profile" onPress={_goToProfile}/>
        </>
    )
}