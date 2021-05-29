import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import configRouting from "./configRouting";

export default function Routing(props) {
  const { setRefreshCheckLogin } = props;
  return (
    <Router>
      <Switch>
        {configRouting.map((route, idx) => (
          <Route key={idx} path={route.path} exact={route.exact}>
            <route.page setRefreshCheckLogin={setRefreshCheckLogin} />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
