import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { InfoState, RequestInfo } from "../../types/infoState";
import { SEARCH_INFO } from "../../constants/api-constants";
import { FetchInfoError, ResponseType } from "../../types/stateGeneric";

export const fetchInfo = createAsyncThunk<
  ResponseType,
  RequestInfo,
  { rejectValue: FetchInfoError }
>("users/fetchInfo", async (request: RequestInfo, thunkApi) => {
  const response = await axios.get(`${SEARCH_INFO}`);

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to fetch info.",
    });
  }

  const data = await response.data;

  return { data: data };
});

const initialState: InfoState = {
  token: "",
  status: "idle",
  error: null,
};

const infoSlice = createSlice({
  name: "info",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchInfo.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchInfo.fulfilled, (state, { payload }) => {
      state.token = '';
      state.status = "idle";
    });

    builder.addCase(fetchInfo.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export default infoSlice.reducer;
