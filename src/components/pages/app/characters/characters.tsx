import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import React from "react";

import { DrawerStackProps } from "../../../../navigation";

export const CharactersPage: React.FC = () => {
    const navigation = useNavigation<DrawerStackProps>();
    const _goToHome = () => navigation.navigate('Home');

    return(
        <>
          <Button title="Home" onPress={_goToHome}/>
        </>
    )
}