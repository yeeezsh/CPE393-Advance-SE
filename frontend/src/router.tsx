import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "./pages";
import QuickNotePage from "./pages/quicknote";
import CardsPage from "./pages/cards";

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
        <Route path="/cards">
          <CardsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
