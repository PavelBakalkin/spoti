import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LogInState } from "../../types/loginState";

const initialState: LogInState = {
  token: window.localStorage.getItem("token"),
};

const loginSlice = createSlice({
  name: "logIn",

  initialState,

  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = loginSlice.actions;

export default loginSlice.reducer;
