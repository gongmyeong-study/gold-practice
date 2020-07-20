import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={["/main", "/"]} component={App} />
        </Switch>
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
