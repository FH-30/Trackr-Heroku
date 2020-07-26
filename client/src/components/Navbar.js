import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import "./Navbar.css"
import axios from 'axios'

class Navbar extends Component {

  state = {
    havePassword: '',
    linkedInID: ''
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, {});
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    });

    axios.defaults.headers.common["authorization"] = localStorage.getItem('authtoken')
        axios.get("https://orbital-trackr.herokuapp.com/api/users/")
        .then(response => {
            this.setState({
                havePassword: response.data.password,
                linkedInID: response.data.linkedInID
            })
        })
  }

  render() {
    let changePassword;
    if (this.state.havePassword) {
      changePassword = <li><a href="/editPassword">Change Password</a></li>
    } 

    let linkedInID;
    if (this.state.linkedInID) {
      linkedInID = <li><a><i className="material-icons tiny right">check</i>LinkedIn</a></li>
    } else {
      linkedInID = <li><a href="/SyncLinkedIn">LinkedIn</a></li>
    }

    return ( (localStorage.getItem('usertoken') && localStorage.getItem('verified') ) ? 
    <div>
      <nav className="blue-grey darken-4">
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo logo">
            <i className="material-icons">code</i> Trackr
          </a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><a href="/">Homepage</a></li>
            <li><a href="/board">Board</a></li>
            <li><a href="/maps">Maps</a></li>
            <li><a href="/Metrics">Metrics</a></li>
            <li><a className="dropdown-trigger" data-target='dropdown1'>Privacy</a></li>
            {/*<li><a className="dropdown-trigger" data-target='dropdown1'>Profile</a></li>*/}
            <li><a href="/login" onClick={this.props.logOut}>Log Out</a></li>
          </ul>
        </div>
      </nav> 
      <ul className="sidenav" id="mobile-demo">
        <li><a href="/">Homepage</a></li>
        <li><a href="/board">Board</a></li>
        <li><a href="/">Maps</a></li>
        <li><a href="/Metrics">Metrics</a></li>
        <li><a className="dropdown-trigger" data-target='dropdown2'>Privacy</a></li>
        <li><a href="/login" onClick={this.props.logOut}>Log Out</a></li>
      </ul>
      <ul id='dropdown1' class='dropdown-content'>
        <li><a href="/editUsername">Change Username</a></li>
        {changePassword}
        <li><a href="/editEmail">Change Email</a></li>
        {linkedInID}
      </ul>
      <ul id='dropdown2' class='dropdown-content'>
        <li><a href="/editUsername">Change Username</a></li>
        {changePassword}
        <li><a href="/editEmail">Change Email</a></li>
        {linkedInID}
      </ul>
    </div>
    :
    <div>
    <nav className="blue-grey darken-4">
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo logo">
          <i className="material-icons">code</i> Trackr
        </a>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><a href="/">Homepage</a></li>
          <li><a href="/login">Board</a></li>
          <li><a href="/login">Maps</a></li>
          <li><a href="/login">Metrics</a></li>
          <li><a href="/login">Privacy</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </div>
    </nav> 
    <ul className="sidenav" id="mobile-demo">
      <li><a href="/">Homepage</a></li>
      <li><a href="/login">Board</a></li>
      <li><a href="/">Maps</a></li>
      <li><a href="/login">Login</a></li>
    </ul>
    </div>
  )
  }
}

/*const Navbar = (props) => {
  return ( (localStorage.getItem('usertoken') && localStorage.getItem('verified')) ? 
    <nav className="nav-wrapper teal darken-4">
      <div className="container">
        <a className="brand-logo">Trackr.</a>
        <ul className="right">
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/thirdboard">Board</Link></li>
          <li><Link to="/login" className="waves-effect waves-light btn-small" onClick={props.logOut}>LOGOUT</Link></li>
          <li>Welcome, { localStorage.getItem('username') } </li>
        </ul>
      </div>
    </nav> 
    :
    <nav className="nav-wrapper teal darken-4">
      <div className="container">
        <a className="brand-logo">Trackr.</a>
        <ul className="right">
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/login" className="waves-effect waves-light btn-small" onClick={props.logOut}>LOGIN</Link></li>
        </ul>
      </div>
    </nav> 
  )
}*/

export default Navbar