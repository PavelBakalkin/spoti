import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LogInState, RequestAccInfo } from "../../types/loginState";
import { FetchInfoError, ResponseType } from "../../types/stateGeneric";
import axios from "axios";

export const fetchAccInfo = createAsyncThunk<
  ResponseType,
  RequestAccInfo,
  { rejectValue: FetchInfoError }
>("logIn/fetchAccInfo", async (request: RequestAccInfo, thunkApi) => {
  const response = await axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${request.token}`,
    },
  });

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to fetch info.",
    });
  }

  const data = await response.data;

  return { data: data };
});

const initialState: LogInState = {
  token: window.localStorage.getItem("token"),
  accInfo: null,
  status: "idle",
  error: null,
};

const loginSlice = createSlice({
  name: "logIn",

  initialState,

  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAccInfo.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchAccInfo.fulfilled, (state, { payload }) => {
      state.accInfo = payload.data;
      state.status = "idle";
    });

    builder.addCase(fetchAccInfo.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export const { setToken } = loginSlice.actions;

export default loginSlice.reducer;
