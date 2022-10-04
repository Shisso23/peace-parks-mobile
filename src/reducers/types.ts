import { UserAuthReducer } from './user-auth-reducer';
import { UserReducer } from './user-reducer';

export type RootReducer = {
  userAuthReducer: UserAuthReducer;
  userReducer: UserReducer;
};
