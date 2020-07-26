import React, { Component } from 'react';
import axios from 'axios'
import "./EditPrivacy.css"

class EditEmail extends Component {
    
    state = {
        newemail:'',
        count: 15,
        isButtonDisabled: false,
        errors:[],
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
        axios.defaults.headers.common["authorization"] = localStorage.getItem('authtoken')
        axios.get("https://orbital-trackr.herokuapp.com/api/users/sendVerificationEmail?email=" + this.state.newemail)
        .then (res => {
            this.setState({
                isButtonDisabled: true,
                count: 15
              })
            setTimeout(this.disableButton, 15000)
            this.setState({
                successMessage: "Successfully change email"
            })
        })
        .catch(err => {
            this.setState({
                errors: err.response.data
            })
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
            sendButton = <button className="btn-large grey" onClick={this.handleSubmit}>Send Verification Email</button>
        }
        return(
            <div class="iris row" style={{marginBottom: 0}}>
                <div className="container">
                    <div className="col s12 l6 push-l3">
                        <div className="card">
                            <div className="card-action blue-grey white-text center">
                                <h3>Change Email</h3>
                            </div>
                            <div className="card-content">
                                <div className="form-field">
                                    <label for="newemail">New Email</label>
                                    <input type="text" id="newemail" name="newemail" autoComplete="off" 
                                        value={this.state.newemail} onChange={this.handleChange} />
                                    <p style={{color: "#a82424"}}> { this.state.errors.email } </p>
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

export default EditEmail