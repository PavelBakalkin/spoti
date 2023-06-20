import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RequestInfo } from "../../types/infoState";
import { SEARCH_INFO } from "../../constants/api-constants";
import { FetchInfoError, ResponseType } from "../../types/stateGeneric";
import { TracksState } from "../../types/tracksState";

export const fetchTracksInfo = createAsyncThunk<
  ResponseType,
  RequestInfo,
  { rejectValue: FetchInfoError }
>("tracks/fetchTracksInfo", async (request: RequestInfo, thunkApi) => {
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

const initialState: TracksState = {
  token: "",
  status: "idle",
  error: null,
  tracks: null,
};

const tracksSlice = createSlice({
  name: "tracks",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchTracksInfo.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchTracksInfo.fulfilled, (state, { payload }) => {
      state.tracks = payload.data;
      state.status = "idle";
    });

    builder.addCase(fetchTracksInfo.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export default tracksSlice.reducer;
