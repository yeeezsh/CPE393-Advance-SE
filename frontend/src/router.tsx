import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "./pages";
import QuickNotePage from "./pages/quicknote";
const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <IndexPage />
        </Route>
        <Route path="/quicknote">
          <QuickNotePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
