import React, { useState } from 'react';
import { Image, ImageBackground, Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

import { RegisterLink, ForgotPasswordLink } from '../../../atoms';
import { LoginForm } from '../../../molecules';
import { FormScreenPeaceParks } from '../../../peaceparkss';
import Images from '../../../../theme/images';
import { Button, Icon, Text } from '@rneui/themed';
import { Colors } from '../../../../theme/variables';

export const LoginPage = () => {

  const [isLogIn, setLogIn] = useState(false);

  const handleLogin = () => {
    setLogIn(!isLogIn);
  };

  const RenderLogin = (showLoginForm: boolean) => {
    if(showLoginForm){
      return ( 
            <>
              <LoginForm/>
              <ForgotPasswordLink containerStyle={tw`mb-${screenHeight*0.015} mt-${screenHeight*0.005}`} />
            </>
        )
    } else {
      return (
            <>
              <Button title="Login" onPress={handleLogin}/>
              <RegisterLink containerStyle={tw`flex flex-row self-center mb-${screenHeight*0.015} mt-4`} />
            </>
      )
    }
  }

  return (
  <ImageBackground source={Images.loginBackground} style={tw`w-full h-full`}>
    <View style={tw`w-full h-full bg-[#00010185]`}>
      {isLogIn ?
        <TouchableOpacity delayPressIn={0} onPress={handleLogin} style={tw`mt-20 ml-6 z-10 absolute`}>
          <Image source={Images.back}/>
        </TouchableOpacity> : null }
      <View>
        <Image source={Images.logo} style={tw`flex self-center mt-${screenHeight*0.07}`}></Image>
        <Image source={Images.brand} style={tw`flex self-center`}></Image>
      </View>
      <FormScreenPeaceParks contentContainerStyle={tw`px-${screenHeight*0.007} mt-auto`}>
        {RenderLogin(isLogIn)}
      </FormScreenPeaceParks>
    </View>
  </ImageBackground>
  )
};


const screenHeight = Dimensions.get('window').height;