import _ from 'lodash';

import { User } from './types';

export const userModel = (data?: User): User => ({
  id: data?.id ?? '',
  firstName: data?.firstName ?? '',
  email: data?.email ?? '',
  regionCode: data?.regionCode ?? '',
  phoneNumber: data?.phoneNumber ?? '',
  childFriendly: data?.childFriendly ?? false,
  subscribedToMail: data?.subscribedToMail ?? false
});
