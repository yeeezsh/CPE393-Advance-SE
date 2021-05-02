import { DELETE_USER, SET_USER } from "./actions";

export interface User {
  _id: string;
  username: string;
  displayname?: string;
  email?: string;
}

export type UserReducer = User;

const initialState: UserReducer = {
  _id: "",
  username: "",
  displayname: "",
  email: "",
};

export const UserReducers = (
  state: UserReducer = initialState,
  action: any
): UserReducer => {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.user,
      };
    case DELETE_USER:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};
