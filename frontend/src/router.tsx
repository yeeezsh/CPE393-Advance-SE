import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "./pages";
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true}>
        <IndexPage />
      </Route>
      <Route path="/signin">
        <SignInPage />
      </Route>
      <Route path="/signup">
        <SignUpPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
