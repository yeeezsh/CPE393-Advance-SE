import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookmarkStore, SelectingBookmark } from "./type";

const initialState: BookmarkStore = {
  selectedTag: "recent",
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    init() {
      return initialState;
    },
    setSelectedTag: (state, action: PayloadAction<{ tag: string }>) => {
      state.selectedTag = action.payload.tag;
    },
    setSetlectBookmark: (
      state,
      action: PayloadAction<{ selecting: SelectingBookmark }>
    ) => {
      state.SelectingBookmark = action.payload.selecting;
    },
    setUnSelectingBookmark: (state) => {
      state.SelectingBookmark = undefined;
    },
  },
});

export const { actions: BookmarkAction } = bookmarkSlice;
export default bookmarkSlice.reducer;
