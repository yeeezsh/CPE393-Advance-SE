import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddBookmark, BookmarkStore } from "./type";

const initialState: BookmarkStore = {
  loading: false,
  data: [],
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<AddBookmark>) => {
      state.data = action.payload.data;
      state.loading = false;
    },
    init() {
      return initialState;
    },
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
  },
});

export const { actions } = bookmarkSlice;
export default bookmarkSlice.reducer;
