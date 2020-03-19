import React from "react";
import { withAuth } from "@okta/okta-react";
import OktaAuth from "@okta/okta-auth-js";
/*
Cite: Followed the tuturials from https://developer.okta.com/blog
to integrate the Okta log-in functionality to our system
*/

export default withAuth(
  class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sessionToken: null,
        error: null,
        username: "",
        password: ""
      };

      this.oktaAuth = new OktaAuth({ url: props.baseUrl });
      this.handleSubmitAction = this.handleSubmitAction.bind(this);
      this.handleChangeUser = this.handleChangeUser.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    // Cite from https://developer.okta.com/blog
    handleSubmitAction(e) {
      e.preventDefault();
      // first send a request to oktaAuth to sign in and get the access token
      this.oktaAuth
        .signIn({
          username: this.state.username,
          password: this.state.password
        })
        .then(result =>
          this.setState({
            sessionToken: result.sessionToken
          })
        )
        .catch(err => {
          this.setState({ error: err.message });
        });
    }
    // everytime if there is a change of the password, update the state
    handleChangePassword(e) {
      this.setState({ password: e.target.value });
    }
    // everytime if there is a change of the user, update the state
    handleChangeUser(e) {
      this.setState({ username: e.target.value });
    }
    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }
      // conditional render, if there is an error, display it
      const errorInformation = this.state.error ? (
        <span className="error-msg">{this.state.error}</span>
      ) : null;

      return (
        <form onSubmit={this.handleSubmitAction}>
          {errorInformation}
          <div className="form-element">
            <label>Username:</label>
            <input
              id="username"
              type="text"
              onChange={this.handleChangeUser}
              value={this.state.username}
            />
          </div>

          <div className="form-element">
            <label>Password:</label>
            <input
              id="password"
              type="password"
              onChange={this.handleChangePassword}
              value={this.state.password}
            />
          </div>
          <input id="submit" type="submit" value="Submit" />
        </form>
      );
    }
  }
);
