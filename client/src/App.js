import React, { Component } from 'react';
import Login from './components/Login/Login.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TemporaryPage from './components/TemporaryPage';
import LandingPage from './components/LandingPage';
import Metrics from './components/Metrics';
import EditUsername from './components/updateprofile/EditUsername';
import EditEmail from './components/updateprofile/EditEmail';
import EditPassword from './components/updateprofile/EditPassword';
import ForgotPassword from './components/updateprofile/ForgotPassword';
import NewPassword from './components/updateprofile/NewPassword';
import ChangedEmail from './components/updateprofile/ChangedEmail';
import SyncLinkedIn from './components/updateprofile/SyncLinkedIn';
import SyncError from './components/updateprofile/SyncError';
import Thirdboard from './components/Thirdboard/Thirdboard';
import Maps from "./components/Maps"
import VerificationPage from './components/Login/VerificationPage.js';
import UsernameForm from './components/UsernameForm.js';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  state = {
    username: '',
    jobs: []
  }

  changeState = (name) => {
    this.setState({
      username: name,
    })
  }

  logOut = () => {
    localStorage.clear()
    this.setState({
      username: '',
    })
  }

  async getNewAuthToken() {
    axios.defaults.headers.common["authorization"] = localStorage.getItem('refreshtoken')
    return axios.post("https://orbital-trackr.herokuapp.com/api/users/refreshAuthToken")
          .then(newToken => {
            localStorage.setItem('authtoken', newToken.data.authToken)
            axios.defaults.headers.common["authorization"] = newToken.data.authToken
          })
          .catch(err => {

          })
    }

  componentDidMount() {
    setInterval(this.getNewAuthToken, 897000)
  }
  
  render() {
    return (
      [
      <Router>
          <header>
          <Navbar username={this.state.username} logOut={this.logOut}/>
          </header>
          <main>
          <Route exact path="/" component= { LandingPage } />
          <Route path="/login" render={(props)=> <Login changeState = {this.changeState}/>} />
          <Route path="/linkedin" component={() => { global.window && (global.window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile%20r_emailaddress&client_id=86zqfh241jqet5&redirect_uri=https%3A%2F%2Forbital-trackr.herokuapp.com%2Fapi%2Fusers%2Flinkedin');
          return null;}}
          />
          <Route path="/board" render={(props)=> <Thirdboard username = {this.state.username} />} />
          <Route path="/verification" component = { VerificationPage }/>
          <Route path="/usernameForm" component = { UsernameForm } />
          <Route path="/temporaryPage" component = { TemporaryPage } />
          <Route path="/Metrics" component = { Metrics } />
          <Route path="/EditEmail" component = { EditEmail } />
          <Route path="/EditPassword" component = { EditPassword } />
          <Route path="/EditUsername" component = { EditUsername } />
          <Route path="/forgotpassword" component = { ForgotPassword } />
          <Route path="/newpassword" component = { NewPassword } />
          <Route path="/changedemail" component = { ChangedEmail } />
          <Route path="/synclinkedin" component = { SyncLinkedIn } />
          <Route path="/syncerror" component = { SyncError } />
          <Route path="/maps" component = { Maps } />
          </main>
          <footer>
          <Footer />
          </footer>
      </Router>
      ]
    );
  }
}


export default App

