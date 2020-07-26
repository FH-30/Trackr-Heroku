import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'

class SignInForm extends Component {
    
    state = {
        username: '',
        password: '',
        isPasswordShown: false,
        errors: [],
    };

    login = (user) => {
        return axios
            .post("https://orbital-trackr.herokuapp.com/api/users/" + "signin", {
                usernameOrEmail: user.username,
                password: user.password
            })
            .then(response => {
                localStorage.setItem('usertoken', response.data)
                localStorage.setItem('verified', response.data.verified)
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
        let value = target.value;
        let stateName = target.name;

        this.setState({
            [stateName]: value
        })
    }

    /* When submit, will perform login if the username and password match,
        hence navigate to homepage */
    handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        }
        this.login(userData)
        .then(res => {
            if (res) {
                this.props.changeState(userData.username)
                this.props.history.push({
                    pathname: "/",
                })
                this.props.history.go(0)
            }
        }).catch(err => {
            if (err.response === 401) {
                this.props.history.push("/verification")
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
                        <label className="FormField__Label" htmlFor="username">Username / Email</label>
                        <input type="text" id="username" className="FormField__Input" 
                            placeholder="Enter your username or email" name="username" autoComplete="off"
                            value={this.state.username} onChange={this.handleChange}
                            />
                        <p style={{color: "#a82424"}}>{ this.state.errors.usernameOrEmail } </p>
                        <p style={{color: "#a82424"}}> { this.state.errors.username } </p>
                        <p style={{color: "#a82424"}}> { this.state.errors.email } </p>
                    </div>

                    {/* Section for password */}
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Password</label>                            
                        <input type={this.state.isPasswordShown ? "text" : "password"} id="password" className="FormField__Input" 
                            placeholder="Enter your password" name="password" autoComplete="off"
                            value={this.state.password} onChange={this.handleChange}
                        />
                        <i>
                            <FontAwesomeIcon icon={this.state.isPasswordShown ? faEyeSlash : faEye} 
                                onClick={this.togglePasswordVisiblity} className="password-icon"
                            />
                        </i>
                        <a href="/forgotpassword" style={{color: "grey"}}>Forgot your password?</a>
                        <p style={{color: "#a82424"}}> { this.state.errors.password } </p>
                        <p style={{color: "#a82424"}}> { this.state.errors.passwordincorrect } </p>
                    </div>

                    {/* Sign In Button */}
                    <div className="FormField">
                        <button className="FormField__Button mr-20" type="Submit">Sign In</button>
                        <Link to="/linkedin"><button className="FormField__Button2 mr-20">Sign In with LinkedIn</button></Link>
                        {/*<Link to="/login/signup" className="FormField__Link">New to Trackr?</Link>*/}
                        
                    </div>
                </form>
            </div>
        )
    }
}


export default SignInForm