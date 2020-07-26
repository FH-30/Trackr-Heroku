import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'

class Maps extends Component {

    state = {
        jobs: [],
        key: ''
    }

    componentDidMount() {
        axios.defaults.headers.common["authorization"] = localStorage.getItem('authtoken')
        axios.get("https://orbital-trackr.herokuapp.com/api/users/")
        .then(response => {
            this.setState({
                jobs: response.data.jobs
            })
        })
        .catch(error => {
            if (error.response.status === 401) {
                this.props.history.push("/login")
            }
        })
        axios.get("https://orbital-trackr.herokuapp.com/api/users/googleAPIKey")
        .then(res => {
            this.setState({key: res.data.API_Key})})
    } 
    
    render() {
        let markers = []
        this.state.jobs.forEach(job => {
            if (job.place) {
                let latitude = job.coordinates[0].lat
                let longitude = job.coordinates[0].lng
                markers.push(
                    <img src={job.logo} style={{borderRadius: "50%"}} lat={latitude} lng={longitude}></img>
                )
            }
        });
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: this.state.key}}
                    defaultCenter={{lat: 1.290270, lng: 103.851959}}
                    defaultZoom={10}
                >
                {markers}
                </GoogleMapReact>
            </div>          
        )
    }
}

export default Maps