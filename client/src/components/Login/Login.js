import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import Logo from './logo.png';
import './Login.css';

class Login extends Component {

    render() {
      return (
      <Switch>
      <div className="login">
        
        <div className="login__Aside">
          <img className="centerLogo" src={Logo} height="375" width="500"></img>
        </div>
        
        <div className="App__Form">
  
          <div className="PageSwitcher">
            <NavLink exact to="/login" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
            <NavLink to="/login/signup" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
          </div>
  
          <div className="FormTitle">
            <NavLink exact to="/login" activeClassName="FormTitle__Link--Active" className="FormTitle__Link"> Sign In</NavLink> or 
            <NavLink to="/login/signup" activeClassName="FormTitle__Link--Active" className="FormTitle__Link"> Sign Up</NavLink>
          </div>
  
          <Route path="/login/signup" render={(props)=> <SignUpForm { ... props } changeState = {this.props.changeState}/>}>
          </Route>
          
          <Route exact path="/login" render={(props)=> <SignInForm { ... props } changeState = {this.props.changeState}/>}>
          </Route>
        </div>
      </div>
      </Switch>
    );
  }
  }
  
  export default Login;
  