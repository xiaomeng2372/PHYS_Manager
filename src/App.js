import React, { Component } from "react";
import { Route } from "react-router-dom";
import { SecureRoute, ImplicitCallback } from "@okta/okta-react";

import Navigation from "./components/shared/Navigation";
import MainPage from "./components/home/MainPage";
import config from "./app.config";
import LoginPage from "./components/auth/LoginPage";
import ProfilePage from "./components/auth/ProfilePage";
import UploadPage from "./components/auth/UploadPage";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <main>
          <Route
            path="/login"
            render={() => <LoginPage baseUrl={config.url} />}
          />
          <Route path="/" exact component={MainPage} />
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <SecureRoute path="/profile" component={ProfilePage} />
          <SecureRoute path="/upload" component={UploadPage} />
        </main>
      </div>
    );
  }
}
