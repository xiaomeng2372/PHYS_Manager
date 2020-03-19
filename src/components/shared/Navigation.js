import React from "react";
import { withAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
/*
Cite: Followed the tuturials from https://developer.okta.com/blog
to integrate the Okta log-in ability to our system
*/

export default withAuth(
  class NavigationBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuth = this.checkAuth.bind(this);
      this.checkAuth(); // check the authentification and update the state
    }

    // Use the "auth" from okta to check the user has credentials already
    async checkAuth() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated }); // update if there is a mismatch
      }
    }
    // if any states or props update, we check the Authen again
    componentDidUpdate() {
      this.checkAuth();
    }

    // conditional render: if authenticated, show up log out
    render() {
      if (this.state.authenticated === null) return null;
      let navBar = null;
      if (this.state.authenticated) {
        navBar = (
          <ul className="nav-bar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => this.props.auth.logout()}
              >
                Log Out
              </a>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        );
      } else {
        navBar = (
          <ul className="auth-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => this.props.auth.login()}
              >
                Sign In
              </a>
            </li>
          </ul>
        );
      }
      return <nav>{navBar}</nav>;
    }
  }
);
