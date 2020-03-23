import React from "react";
import {Nav, Navbar} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
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
      return (
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
          <Link className = "navbar-brand"to= "/">Exam Stats</Link>
          <Navbar.Toggle aria-controls="mainNavigation" />
          <Navbar.Collapse id="mainNavigation">
            <ul className="navbar-nav mr-auto">
              <il className="nav-item">
                  <Link className = "nav-link" to="/">Home</Link>
                  
              </il> 
               {this.state.authenticated ? <il className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></il>:''}
            </ul>
            <Nav>
              {this.state.authenticated ? 
              <Button variant="outline-danger" onClick = {() => this.props.auth.logout()}>Log Out</Button> :
              <Button variant="outline-info" onClick = {() => this.props.auth.login()}>Log In</Button>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>); 
    }
  }

);
const navigationStyle = {

}
