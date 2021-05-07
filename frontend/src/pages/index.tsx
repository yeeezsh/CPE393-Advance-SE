import React from "react";
import HomePage from "../modules/home/pages/home";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../common/store";
import { useHistory } from "react-router";
import { setUser } from "../common/store/user";

export interface IndexPageProps {
  enableAuth?: boolean;
}

const IndexPage: React.FC<IndexPageProps> = ({ enableAuth = true }) => {
  // const isAuth = useSelector((state: Store) => state.user.isAuth);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

  if (enableAuth && !user) history.replace("/signin");
  user && dispatch(setUser(JSON.parse(user)));

  return <HomePage />;
};

export default IndexPage;
