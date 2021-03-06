import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import bookmarkReducer from "./bookmark";
import InstantSearchReducer from "./instantSearch";
import tagReducer from "./tags";

export type Store = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  user: userReducer,
  bookmark: bookmarkReducer,
  instantSearch: InstantSearchReducer,
  tags: tagReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
