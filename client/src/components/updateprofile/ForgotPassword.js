import React, { Component } from 'react';
import axios from 'axios'

class ForgotPassword extends Component {
    
    state = {
        username:'',
        count: 15,
        isButtonDisabled: false,
        errors:[]
    };

    handleChange = (e) => {
        let target = e.target;
        let value = target.value;
        let stateName = target.name;

        this.setState({
            [stateName]: value
        })
    }

    disableButton = () => {
        this.setState({
          isButtonDisabled: !this.state.isButtonDisabled
        })
      }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.get("https://orbital-trackr.herokuapp.com/api/users/sendPasswordRecoveryEmail/" + this.state.username)
        .then(res => {
            this.setState({
                isButtonDisabled: true,
                count: 15
              })
            setTimeout(this.disableButton, 15000)
        })
        .catch(err => {
            if (this.state.username) {
                this.setState({
                    errors: err.response.data
                })
            } else {
                this.setState({
                    errors: {empty: "This field is required"}
                })
            }
        })
    }

    componentDidMount() {
        setInterval(() => {
          this.setState({
            count: this.state.count - 1
          })}, 1000)
    }

    render() {
        let sendButton;
        if (this.state.isButtonDisabled) {
            sendButton = <button className="btn-large grey">Wait {this.state.count}</button>
        } else {
            sendButton = <button className="btn-large grey" onClick={this.handleSubmit}>Send Recovery Email</button>
        }
        return(
            <div className="bgimage" style={{marginBottom: 0}}>
            <div className="row login" style={{marginBottom: 0}}>
                <div className="col s12 l4 offset-l4">
                    <div className="card">
                        <div className="card-action blue-grey white-text">
                            <h3>No Worries!</h3>
                        </div>
                        <div className="card-content">
                            <div className="form-field">
                                <label for="username">Please input your username / email</label>
                                <input type="text" id="username" name="username" autoComplete="off" 
                                value={this.state.username} onChange={this.handleChange} />
                                <p style={{color: "#a82424"}}> { this.state.errors.email} </p>
                                <p style={{color: "#a82424"}}> { this.state.errors.username} </p>
                                <p style={{color: "#a82424"}}> { this.state.errors.error} </p>
                                <p style={{color: "#a82424"}}> { this.state.errors.empty} </p>
                            </div>
                            <div className="form-field center-align">
                                {sendButton}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }


}

export default ForgotPassword