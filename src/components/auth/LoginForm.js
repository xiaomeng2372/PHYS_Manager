import React from "react";
import { withAuth } from "@okta/okta-react";
import OktaAuth from "@okta/okta-auth-js";
import Alert from 'react-bootstrap/Alert'
import './formStyle.css';
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
        error: "",
        username: "",
        password: ""
      };

      this.oktaAuth = new OktaAuth({ url: props.baseUrl });
      this.handleSubmitAction = this.handleSubmitAction.bind(this);
      this.handleChange = this.handleChange.bind(this);
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
          this.setState({ username: '', password: '', errorMsg: 'Incorrect username or password',  error: err.message });
        });
    }
    // anytime there is a change in input, update the state
    handleChange(e) {
      this.setState({ [e.target.id]: e.target.value });
    }
    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      return (
        <div className = 'box'>
          <h2 className="title is-3 has-text-info">Log in</h2>
          <form onSubmit={this.handleSubmitAction}>
            <div className= "form-group">
              <div className="inputBox">
                <input name="username" id="username" type="text" onChange={this.handleChange} value={this.state.username} required/>
                <label>username</label>
              </div>
            </div>

            <div className="form-group">
              <div className= "inputBox">
                <input name = "password"id="password" type="password" onChange={this.handleChange} value={this.state.password} required />
                <label>password</label>
              </div>
            </div>
            <div className="field">
                <div className="control">
                    <p id="message" className="help is-danger">{this.state.errormsg}</p>
                </div>
            </div>
            {this.state.error == ""? '' : <Alert variant="danger">{this.state.error}</Alert>}
            <div className="field">
              <div className="control">
                <button id="submit" type="submit">Log in</button>
              </div>
            </div>
          </form>

        </div>
      );
    }
  }
);
