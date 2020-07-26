import React, { Component } from 'react';
import axios from 'axios'

class UsernameForm extends Component {
    
    state = {
        username:'',
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

    handleSubmit = (e) => {
        e.preventDefault()
        axios.put("https://orbital-trackr.herokuapp.com/api/users/username", {
            username: this.state.username
        })
        .then (res => {

            localStorage.setItem('usertoken', res.data)
            localStorage.setItem('verified', res.data.verified)
            localStorage.setItem('username', this.state.username)
            setTimeout(() => { 
                this.props.history.push("/")
                this.props.history.go(0)
                }, 2000)
                
        })
        .catch(err => {
            this.setState({
                errors: err.response.data
            })
        })
    }

    render() {
        return(
            <div className="bgimage" style={{marginBottom: 0}}>
            <div className="row login" style={{marginBottom: 0}}>
                <div className="col s12 l4 offset-l4">
                    <div className="card">
                        <div className="card-action blue-grey white-text">
                            <h3>Welcome</h3>
                        </div>
                        <div className="card-content">
                            <div className="form-field">
                                <label for="username">Choose your username</label>
                                <input type="text" id="username" name="username" autoComplete="off" 
                                value={this.state.username} onChange={this.handleChange} />
                                <p style={{color: "black"}}>{ this.state.errors.username} </p>
                                <p style={{color: "black"}}>{ this.state.errors.error} </p>
                            </div>
                            <div className="form-field center-align">
                                <button className="btn-large red" onClick={this.handleSubmit}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }


}

export default UsernameForm