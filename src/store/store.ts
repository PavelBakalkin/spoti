import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginSlice from './Slices/loginSlice';
import infoSlice from './Slices/infoSlice';

export const store = configureStore({
  reducer: {
    logIn: loginSlice,
    info: infoSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
