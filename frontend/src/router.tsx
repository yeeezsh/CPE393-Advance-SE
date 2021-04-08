import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "./pages";
import SignInPage from "./pages/signin";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <IndexPage />
        </Route>
        <Route path="/signin">
          <SignInPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
