import { useNavigation } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import tw from 'twrnc';

import { DrawerStackProps } from "../../../../navigation";
import images from "../../../../theme/images";
import { ContactUsForm } from "../../../molecules/contact-us-form";
import { FormScreenPeaceParks } from "../../../peaceparkss";

export const ContactUsPage: React.FC = () => {
    const navigation = useNavigation<DrawerStackProps>();
    const _goToHome = () => navigation.navigate('Home');

    return(
        <FormScreenPeaceParks contentContainerStyle={tw`bg-white px-5 py-8`}>
          <TouchableOpacity style={tw`flex flex-row mb-4 mt-6`} onPress={_goToHome}>
            <Image source={images.backArrow} resizeMode="contain" style={tw`h-4 w-4 mt-1`} />
            <Image source={images.backPlaceholder} resizeMode="contain" style={tw`h-5 w-12 mt-0.5`}/>
          </TouchableOpacity>
          <Text style={tw`text-2xl text-green-600 mb-6`}>Get in Touch</Text>
          <Text style={tw`mb-8 text-sm`}>We’d love to hear from you. Please contact us using the details below or via the contact form on this page.</Text>
          <Text style={tw`font-medium mb-2`}>Postal Address</Text>
          <Text style={tw`text-sm mb-4`}>PO Box 12743, Die Boord, Stellenbosch, South Africa, 7613</Text>
          <Text style={tw`font-medium mb-2`}>Phone Number</Text>
          <Text style={tw`text-sm mb-4`}>+27 (0)21 880 5100</Text>
          <Text style={tw`font-medium mb-2`}>Email</Text>
          <Text style={tw`text-sm mb-8`}>ppfcomms@peaceparks.org</Text>
          <ContactUsForm/>
        </FormScreenPeaceParks>
    )
}