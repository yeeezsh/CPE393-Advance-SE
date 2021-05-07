import React from "react";
import HomePage from "../modules/home/pages/home";
import { useSelector } from "react-redux";
import { Store } from "../common/store";
import { useHistory } from "react-router";

export interface IndexPageProps {
  enableAuth?: boolean;
}

const IndexPage: React.FC<IndexPageProps> = ({ enableAuth = true }) => {
  const isAuth = useSelector((state: Store) => state.user.isAuth);
  const history = useHistory();

  if (!isAuth && enableAuth) history.replace("/signin");

  return <HomePage />;
};

export default IndexPage;
