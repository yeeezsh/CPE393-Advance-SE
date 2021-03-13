import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "./pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <IndexPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
