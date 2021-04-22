import { UserReducers } from "./users";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  UserReducers,
});

export default rootReducer;

export type RootReducersType = ReturnType<typeof rootReducer>;
