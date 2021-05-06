import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Quicknote {
  _id: string;
  url: string;
  tags: string[];
  imageUpload: string[];
}

const initialState = {
  quicknote: { _id: "", url: "", tags: [], imageUpload: [] } as Quicknote,
};

const userSlice = createSlice({
  name: "quicknote",
  initialState,
  reducers: {
    setQuickNote: (state, action: PayloadAction<Quicknote>) => {
      state.quicknote = action.payload;
    },
  },
});

export const { setQuickNote } = userSlice.actions;
export default userSlice.reducer;