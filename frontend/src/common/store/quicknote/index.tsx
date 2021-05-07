import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Quicknote {
  _id: string;
  domain: string;
  note: string;

//   tags: string[];
//   imageUpload: string[];
}

const initialState = {
  quicknote: { _id: "", domain: "", note: ""} as Quicknote,
//   quicknote: { _id: "", domain: "", note: "", tags: [] } as Quicknote,

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