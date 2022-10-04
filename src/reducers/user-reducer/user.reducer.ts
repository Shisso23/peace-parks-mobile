import { createSlice, PayloadAction, Selector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { userModel } from './user.model';
import { User, UserReducer } from './types';

const initialState: UserReducer = {
  user: userModel(),
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserAction } = userSlice.actions;
export const userSelector: Selector<RootState, UserReducer> = (state: RootState) =>
  state.userReducer;

export default userSlice.reducer;
