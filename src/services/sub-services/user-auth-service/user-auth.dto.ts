import { RegisterValueProps } from '../../../components';

export const registerDto = (formData: RegisterValueProps) => ({
  username: formData?.email,
  password: formData?.password,
  email: formData?.email,
  firstName: formData?.name,
  lastName: formData?.surname,
  regionCode: formData?.regionCode,
  phoneNumber: formData?.phoneNumber,
  confirmLink: formData?.email,
});
