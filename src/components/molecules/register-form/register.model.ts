import { RegisterApiValues } from './types';

export const registerModel = (data?: RegisterApiValues) => ({
  email: data?.email,
  password: data?.password,
  confirmPassword: data?.confirm_password,
  termsAndConditions: data?.terms_and_conditions,
});
