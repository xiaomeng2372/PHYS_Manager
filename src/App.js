import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import Navigation from "./components/shared/Navigation";
import HomePage from "./components/home/HomePage";
import RegistrationForm from "./components/auth/RegistrationForm";
import LoginPage from "./components/auth/LoginPage";
import ProfilePage from "./components/auth/ProfilePage";
import "./App.css";

const config = {
  url: "https://dev-676030.okta.com",
  issuer: "https://dev-676030.okta.com/oauth2/default",
  redirect_uri: window.location.origin + "/implicit/callback",
  client_id: "0oa39qqnrh2yHkQhE4x6"
};

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Security {...config}>
          <Navigation />
          <main>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/login"
              render={() => <LoginPage baseUrl={config.url} />}
            />
            <Route path="/implicit/callback" component={ImplicitCallback} />
            <Route path="/register" component={RegistrationForm} />
            <SecureRoute path="/profile" component={ProfilePage} />
          </main>
        </Security>
      </div>
    );
  }
}
