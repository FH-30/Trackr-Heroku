import React, { Component } from 'react';
import axios from 'axios'
import "./EditPrivacy.css"

class SyncLinkedIn extends Component {
    
    state = {
        objectid:''
    };

    componentDidMount() {
        axios.defaults.headers.common["authorization"] = localStorage.getItem('authtoken')
        axios.get("https://orbital-trackr.herokuapp.com/api/users/")
        .then(res => {
            this.setState({
                objectid: res.data._id
            })
        }).catch(err => {
        })
    }
    
    render() {
        let link = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_liteprofile%20r_emailaddress&client_id=86zqfh241jqet5&redirect_uri=https%3A%2F%2Forbital-trackr.herokuapp.com%2Fapi%2Fusers%2Flinkedin%3Fid%3D" +
                    this.state.objectid
        return(
            <div class="iris row" style={{marginBottom: 0}}>
                <div className="container">
                    <div className="col s12 l6 push-l3 center-align valign-wrapper">
                        <div className="card">
                            <div className="card-action blue-grey center">
                                <a style={{color: "lightblue"}} href={link}>Sync With LinkedIn Account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SyncLinkedIn