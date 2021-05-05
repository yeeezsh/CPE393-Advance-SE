import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  username: string;
  displayname?: string;
  email?: string;
}

const initialState = {
  _id: "",
  username: "",
  displayname: "",
  email: "",
} as User;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state = action.payload;
    },
    deleteUser(state) {
      state = initialState;
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
