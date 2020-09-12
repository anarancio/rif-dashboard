import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../containers/home";

const RootNavigation = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default RootNavigation;
