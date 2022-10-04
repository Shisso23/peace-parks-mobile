import { userAuthService } from '../../services';
import { setIsAuthenticatedAction } from './user-auth.reducer';

export const signOutAction: Function = () => (dispatch: Function) => {
  userAuthService.logout().then(() => {
    dispatch(setIsAuthenticatedAction(false));
  });
};
