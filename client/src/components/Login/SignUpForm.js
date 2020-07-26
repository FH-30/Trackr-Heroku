import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/*import { register } from '../UserFunctions.js'*/
import axios from 'axios'

class SignUpForm extends Component {
    
    state = {
        username: '',
        password: '',
        isPasswordShown: false,
        email: '',
        errors: []
    };

    register = (newUser) => {
        return axios
            .post("https://orbital-trackr.herokuapp.com/api/users/" + "signup", { 
                username: newUser.username,
                password: newUser.password,
                email: newUser.email
            })
            .then(response => {
                localStorage.setItem('usertoken', response.data)
                localStorage.setItem('refreshtoken', response.data.refreshToken)
                localStorage.setItem('authtoken', response.data.authToken)
                localStorage.setItem('username', response.data.user.username)
                axios.defaults.headers.common["authorization"] = response.data.authToken
                return response.data
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data
                })
            })
    }

    /* When filling the form, will update the state to accept 
        user input */
    handleChange = (e) => {
        let target = e.target;
        let value = target.value
        let stateName = target.name

        this.setState({
            [stateName]: value
        })
    }

    /* When submit, will perform register new user to database,
        hence navigate to homepage */
    handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        this.register(newUser).then(resp => {
            if (resp) {
            this.props.changeState(newUser.username)
            this.props.history.push({
                pathname: "/verification",
            })
            } 
        })
    }

    /* When enabled, password will be displayed either as text
        or hidden */
    togglePasswordVisiblity = () => {
        const { isPasswordShown } = this.state;
        this.setState({ isPasswordShown: !isPasswordShown });
      };
    
    render() {
        return(
            <div className="FormCenter">
                <form onSubmit={this.handleSubmit} className="FormFields">
                        
                    {/* Section for username */}
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="username">Username</label>
                        <input type="text" id="username" className="FormField__Input" 
                            placeholder="Enter your new username" name="username" autoComplete="off"
                            value={this.state.username} onChange={this.handleChange}
                            />
                        <p style={{color: "#a82424"}}> { this.state.errors.username } </p>
                    </div>

                    {/* Section for password */}
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Password</label>
                        <input type={this.state.isPasswordShown ? "text" : "password"} id="password" className="FormField__Input" 
                            placeholder="Enter your new password" name="password" autoComplete="off"
                            value={this.state.password} onChange={this.handleChange}
                            />
                        <i>
                            <FontAwesomeIcon icon={this.state.isPasswordShown ? faEyeSlash : faEye} className="password-icon" 
                                onClick={this.togglePasswordVisiblity}
                            />
                        </i>
                        <p style={{color: "#a82424"}}>{ this.state.errors.password } </p>
                    </div>

                    {/* Section for email */}
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">Email Address</label>
                        <input type="text" id="email" className="FormField__Input" 
                            placeholder="Enter your email address" name="email" autoComplete="off"
                            value={this.state.email} onChange={this.handleChange}
                            />
                        <p style={{color: "#a82424"}}>{ this.state.errors.email } </p>
                    </div>

                    {/* Sign Up Button */}
                    <div className="FormField">
                        <button className="FormField__Button mr-20" type="Submit">Sign Up</button>
                        <Link exact to="/login" className="FormField__Link">Have an account?</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUpForm