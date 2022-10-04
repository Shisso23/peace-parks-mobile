import _ from 'lodash';

import { User } from './types';

export const userModel = (data?: User): User => ({
  email: _.get(data, 'email', ''),
});
