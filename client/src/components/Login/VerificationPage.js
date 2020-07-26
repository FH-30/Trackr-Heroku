import React, { Component } from 'react';
import Logo from './logo.png';
import './Login.css';
import axios from 'axios';

class VerificationPage extends Component {

    state = {
      isButtonDisabled: false,
      count: 15,
    }

    disableButton = () => {
      this.setState({
        isButtonDisabled: !this.state.isButtonDisabled
      })
    }

    sendVerificationEmail = () => {
        this.setState({
          isButtonDisabled: true,
          count: 15
        })
        setTimeout(this.disableButton, 15000)
        axios.defaults.headers.common["authorization"] = localStorage.getItem('authtoken')
        return axios.get("https://orbital-trackr.herokuapp.com/api/users/sendVerificationEmail")
    }

    componentDidMount() {
      setInterval(() => {
        this.setState({
          count: this.state.count - 1
        })}, 1000)
      }

    render() {
      let SendButton;
      if (this.state.isButtonDisabled) {
        SendButton = <button className="btn grey offSendEmail">Please Wait for {this.state.count} seconds
        <i class="normal material-icons right">send</i></button>
      } else {
        SendButton = <button className="btn sendEmail" onClick={this.sendVerificationEmail}>Resend Verification Email
        <i class="normal material-icons right">send</i></button>
      }
      return (
      <div className="login">
        <div className="login__Aside">
          <img className="centerLogo" src={Logo} height="375" width="500"></img>
        </div>
        <div className="App__Form">
            <h3 className="center">Welcome to Trackr!</h3>
            <h5 className="center">We are thrilled to enchance your job search experience. For your own security, please check your email to confirm your account</h5>
            {SendButton}
        </div>
      </div>
      )
    }
}

export default VerificationPage