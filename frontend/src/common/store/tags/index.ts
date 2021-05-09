import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TagDto } from "../../services/generate/generate-types";

type DataTagStore = Pick<TagDto, "_id" | "createAt" | "label">[];
export type TagStore = {
  tags: DataTagStore;
};

const initialState: TagStore = {
  tags: [],
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    init() {
      return initialState;
    },
    updateTag(state, action: PayloadAction<{ data: DataTagStore }>) {
      state.tags = action.payload.data;
    },
  },
});

export const { actions: TagAction } = tagSlice;
export default tagSlice.reducer;
