/*
Cite: Followed the tuturials from https://developer.okta.com/blog
to set up the Okta log-in management to our system
*/
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import config from "./app.config";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Security } from "@okta/okta-react";

function onAuthRequired({ history }) {
  history.push("/login");
}

ReactDOM.render(
  <Router>
    <Security
      issuer={config.issuer}
      client_id={config.client_id}
      redirect_uri={config.redirect_uri}
      onAuthRequired={onAuthRequired}
    >
      <App />
    </Security>
  </Router>,
  document.getElementById("root")
);
serviceWorker.unregister();
