import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Selector } from 'react-redux';

import { RootState } from '../store';
import { UserAuthReducer } from './types';

const initialState: UserAuthReducer = {
  isAuthenticated: false,
};

export const userAuthSlice = createSlice({
  name: 'userAuthSlice',
  initialState,
  reducers: {
    setIsAuthenticatedAction: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuthenticatedAction } = userAuthSlice.actions;
export const userAuthSelector: Selector<RootState, UserAuthReducer> = (state: RootState) =>
  state.userAuthReducer;

export default userAuthSlice.reducer;
