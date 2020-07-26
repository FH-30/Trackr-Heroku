import React, { Component } from 'react'
import {Bar, Pie} from 'react-chartjs-2'
import axios from 'axios'

class Metrics extends Component {

    state = {
        jobs: [],
        stats: [],
    }

    componentDidMount() {
        axios.defaults.headers.common["authorization"] = localStorage.getItem('authtoken')
        axios.get("https://orbital-trackr.herokuapp.com/api/users/sortedJobs?weekly=true")
        .then(response => {          
            this.setState({
                jobs: response.data.jobs
            })
        })
        .catch(error => {

        })
        axios.get("https://orbital-trackr.herokuapp.com/api/users")
        .then(res => {
            this.setState({
                stats: res.data.metrics
            })
        })
    }
    
    render() {
        let weeklyJobs = []
        this.state.jobs.forEach(job => {
            weeklyJobs.push(
                <li class="collection-item avatar">
                    <img src={job.logo} class="circle" />
                        <span class="title">{job.company} ({job.status})</span>
                            <p> {job.role} <br />
                            {job.interviewDate.split("T")[0]} [{job.interviewDate.split("T")[1]}]
                            </p>
                    <a href="/board" class="secondary-content"><i class="material-icons">grade</i></a>
                </li>
            )
        })
        if (!this.state.jobs[0]) {
            weeklyJobs.push(
                <li class="collection-item avatar">
                   <span class="title">Nothing to worry about!</span> 
                </li>
            )
        }
        let chartData;
        chartData = {
            labels: ["To Apply", "Applied", "Interview", "Offer"],
            datasets: [
                {
                    label: "Job Statistics",
                    data: this.state.stats,
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'
                                        , 'rgb(255, 206, 86)', 'rgb(75, 192, 192)']
                }
            ]
        }
        return(
            <div class="irisWhite row" style={{marginBottom: 0, marginTop: 0}}>
                <div className="container">
                    <div className="col s12 m6 l6">
                        <div className="card">
                            <div className="card-content">
                            <Bar data={chartData} options=
                                {{scales: {yAxes: [{ticks: {min: 0, stepSize: 1}}]}}} 
                                width={50} height={65} />
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6 l6">
                        <div className="card">
                            <div className="card-content">
                            <Pie data={chartData} />
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m6 l5 push-l1">
                        <ul className="collection with-header">
                            <li class="collection-header"><h4>This week...</h4></li>
                            {weeklyJobs}
                        </ul>
                    </div>
                </div>
                </div>
        )
    }
}

export default Metrics