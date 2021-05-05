import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user';

export type Store = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
 