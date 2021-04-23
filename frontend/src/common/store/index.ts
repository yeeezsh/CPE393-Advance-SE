import { combineReducers, configureStore } from "@reduxjs/toolkit";

export type Store = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
