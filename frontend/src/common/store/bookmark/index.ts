import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookmarkStore } from "./type";

const initialState: BookmarkStore = {
  selectedTag: "",
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
  },
});

export const { actions } = bookmarkSlice;
export default bookmarkSlice.reducer;
