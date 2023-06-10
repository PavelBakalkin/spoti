import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { InfoState, RequestInfo } from "../../types/infoState";
import { SEARCH_INFO } from "../../constants/api-constants";
import { FetchInfoError, ResponseType } from "../../types/stateGeneric";

export const fetchInfo = createAsyncThunk<
  ResponseType,
  RequestInfo,
  { rejectValue: FetchInfoError }
>("info/fetchInfo", async (request: RequestInfo, thunkApi) => {
  const response = await axios.get(`${SEARCH_INFO}`, {
    headers: {
      Authorization: `Bearer ${request.token}`,
    },
    params: {
      q: request.searchKey,
      type: `${request.type}`,
    },
  });

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to fetch info.",
    });
  }

  const data = await response.data.artists;

  return { data: data };
});

const initialState: InfoState = {
  token: "",
  status: "idle",
  error: null,
  data: null,
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
      state.data = payload.data;
      state.status = "idle";
    });

    builder.addCase(fetchInfo.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export default infoSlice.reducer;
