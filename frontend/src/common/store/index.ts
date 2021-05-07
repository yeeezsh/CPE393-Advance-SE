import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import InstantSearchReducer from "./instantSearch";

export type Store = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  user: userReducer,
  instantSearch: InstantSearchReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
