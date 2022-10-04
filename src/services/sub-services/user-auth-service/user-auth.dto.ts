import { RegisterValueProps } from '../../../components';

export const registerDto = (formData: RegisterValueProps) => ({
  email: formData?.email,
  password: formData?.password,
  confirm_password: formData?.confirmPassword,
  terms_and_conditions: formData?.termsAndConditions,
});
