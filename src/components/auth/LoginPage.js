import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { withAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";

/*
Cite: Followed the tuturials from https://developer.okta.com/blog
to integrate the Okta log-in functionalities to our system
*/
export default withAuth(
  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuth = this.checkAuth.bind(this);
      this.checkAuth(); // check the authen and update the state
    }
    // after each update, we check auth again
    componentDidUpdate() {
      this.checkAuth();
    }

    // asynchrouns call to check auth and update the state
    async checkAuth() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }
    // Cite: Followed the tuturials from https://developer.okta.com/blog
    render() {
      if (this.state.authenticated === null) return null;
      return this.state.authenticated ? (
        <Redirect to={{ pathname: "/profile" }} />
      ) : (
        <LoginForm baseUrl={this.props.baseUrl} />
      );
    }
  }
);
