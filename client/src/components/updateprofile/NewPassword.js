import React, { Component } from 'react';
import axios from 'axios'
import "./EditPrivacy.css"

class NewPassword extends Component {
    
    state = {
        newpassword:'',
        errors:[],
        successMessage:''
    };

    handleChange = (e) => {
        let target = e.target;
        let value = target.value;
        let stateName = target.name;

        this.setState({
            [stateName]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.put("https://orbital-trackr.herokuapp.com/api/users/password?recovery=true", {
            newPassword: this.state.newpassword
        }).then(res => {
            this.setState({
                successMessage: "Successfully Change Password"
            })
        }).catch(err => {
            this.setState({
                errors: err.response.data
            })
        })
    }

    componentDidMount() {
        let url = window.location.href;
        if (url.includes('?')) {
            let authToken = new URLSearchParams(window.location.search).get('authToken')
            axios.defaults.headers.common["authorization"] = authToken
        }
    }
    
    render() {
        return(
            <div class="iris row" style={{marginBottom: 0}}>
                <div className="container">
                    <div className="col s12 l6 push-l3">
                        <div className="card">
                            <div className="card-action blue-grey lighten-5 black-text">
                                <h3>New Password</h3>
                            </div>
                            <div className="card-content">
                                <div className="form-field">
                                    <label for="newpassword">Please input new password</label>
                                    <input type="text" id="newpassword" name="newpassword" autoComplete="off" 
                                        value={this.state.newpassword} onChange={this.handleChange} />
                                    <p style={{color: "#a82424"}}> { this.state.errors.newPassword }</p>
                                </div>
                                <div className="form-field center-align">
                                    <button className="btn-large grey" onClick={this.handleSubmit}>Save</button>
                                </div>
                            </div>
                        </div>
                        <h3>{this.state.successMessage}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewPassword