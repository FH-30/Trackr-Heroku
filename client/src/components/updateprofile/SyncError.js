import React, { Component } from 'react'
import "./EditPrivacy.css"

class SyncError extends Component {
    render() {
        return (
            <div className="iris row" style={{marginBottom: 0}}>
                <div className="col s12 l4 offset-l4">
                    <div className="card">
                        <div className="card-action blue-grey white-text">
                            <h5>Sorry, your LinkedIn Account is already with Trackr</h5>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}

export default SyncError
