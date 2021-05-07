import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InstantSearchReducer, INSTANT_SEARCH } from "./types";

const initialState: InstantSearchReducer = {
  results: [],
  word: "",
  loading: false,
};

export const instantSearchSlice = createSlice({
  name: INSTANT_SEARCH,
  initialState,
  reducers: {
    onSearch(state, action: PayloadAction<{ word: string }>) {
      const word = action.payload.word;
      if (word === "") {
        return initialState;
      } else {
        state.word = word;
      }
    },
    onData(
      state,
      action: PayloadAction<{
        data: InstantSearchReducer["results"];
        loading: boolean;
      }>
    ) {
      const { loading, data } = action.payload;
      state.loading = loading;
      state.results = data;
    },
  },
});

export const instantSearchActions = instantSearchSlice.actions;
export default instantSearchSlice.reducer;
