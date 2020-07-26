import React, { Component } from 'react';
import axios from 'axios'
import "./EditPrivacy.css"

class EditPassword extends Component {
    
    state = {
        oldpassword:'',
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
        axios.defaults.headers.common["authorization"] = localStorage.getItem('authtoken')
        axios.put("https://orbital-trackr.herokuapp.com/api/users/password?recovery=false", {
            oldPassword: this.state.oldpassword,
            newPassword: this.state.newpassword,
        })
        .then (res => {
            this.setState({
                successMessage: "Successfully change password"
            })
        })
        .catch(err => {
            this.setState({
                errors: err.response.data
            })
        })
    }
    
    render() {
        return( (this.state.successMessage === '') ? 
            <div class="iris row" style={{marginBottom: 0}}>
                <div className="container">
                    <div className="col s12 l6 push-l3 valign-wrapper">
                        <div className="card">
                            <div className="card-action blue-grey white-text center">
                                <h3>Change Password</h3>
                            </div>
                            <div className="card-content">
                                <div className="form-field">
                                    <label for="oldpassword">Old Password</label>
                                    <input type="text" id="oldpassword" name="oldpassword" autoComplete="off" 
                                        value={this.state.oldpassowrd} onChange={this.handleChange} />
                                    <p style={{color: "#a82424"}}> { this.state.errors.oldPassword }</p>
                                </div>
                                <div className="form-field">
                                    <label for="newpassword">New Password</label>
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
            :
            <div class="iris row" style={{marginBottom: 0}}>
                <div className="container">
                    <div className="col s12 l6 push-l3">
                        <div className="card">
                            <div className="card-action blue-grey lighten-5 black-text">
                                <h3>Password Changed</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditPassword