import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import bookmarkReducer from "./bookmark";

export type Store = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  user: userReducer,
  bookmark: bookmarkReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
