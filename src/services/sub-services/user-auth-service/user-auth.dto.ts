import { RegisterValueProps } from '../../../components';

export const registerDto = (formData: RegisterValueProps) => ({
  username: formData?.email,
  password: formData?.password,
  email: formData?.email,
  firstName: formData?.name,
  lastName: formData?.name,
  regionCode: formData?.regionCode,
  phoneNumber: formData?.phoneNumber,
  confirmLink: formData?.email,
  agreeToPrivacyPolicy: formData?.termsAndConditions,
  subscribeToMail: formData?.mailSubscription,
});
