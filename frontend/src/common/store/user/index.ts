import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";

const initialState = {
  user: { _id: "", username: "", displayName: "", email: "" } as User,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    deleteUser: (state) => {
      state.user = initialState.user;
      state.isAuth = false;
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
