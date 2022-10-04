import { User } from '../../../reducers/user-reducer';

export const userDto = (formData: User) => ({
  user: {
    email: formData?.email ?? '',
  },
});
