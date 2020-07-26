import React, { Component } from 'react';
import axios from 'axios'
import "./EditPrivacy.css"

class EditUsername extends Component {
    
    state = {
        username:'',
        errors:[],
        successMessage: '',
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
        axios.put("https://orbital-trackr.herokuapp.com/api/users/username", {
            username: this.state.username
        })
        .then (res => {
            localStorage.setItem('username', this.state.username)
            this.setState({
                successMessage: "Successfully change username"
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
                                <h3>Change Username</h3>
                            </div>
                            <div className="card-content">
                                <div className="form-field">
                                    <label htmlFor="username">Choose your new username</label>
                                    <input type="text" id="username" name="username" autoComplete="off" 
                                        value={this.state.username} onChange={this.handleChange} />
                                    <p style={{color: "#a82424"}}> { this.state.errors.username } </p>                                    <p style={{color: "black"}}>{ this.state.errors.error } </p>
                                </div>
                                <div className="form-field center-align">
                                    <button className="btn-large grey" onClick={this.handleSubmit}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div class="iris row" style={{marginBottom: 0}}>
                <div className="container">
                    <div className="col s12 l6 push-l3">
                        <div className="card">
                            <div className="card-action blue-grey lighten-5 white-text">
                                <h3>Username Changed</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default EditUsername