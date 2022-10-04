import React from 'react';
import tw from 'twrnc';

import { RegisterLink, ForgotPasswordLink } from '../../../atoms';
import { LoginForm } from '../../../molecules';
import { FormScreenPeaceParks } from '../../../peaceparkss';

export const LoginPage = () => (
  <FormScreenPeaceParks>
    <LoginForm />
    <RegisterLink containerStyle={tw`my-4`} />
    <ForgotPasswordLink />
  </FormScreenPeaceParks>
);
