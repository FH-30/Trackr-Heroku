import React , { Component } from 'react'
import "./Thirdboard.css"
import AddJobs from "../AddJobs.js"
import Thirdcard from "./Thirdcard.js"
import axios from 'axios'


class Thirdboard extends Component {

    state = {
        weekly: false,
        showForm: false,
        jobs: []
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData("id", id)
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDrop = (e, newStatus) => {
        let id = e.dataTransfer.getData("id")
        /*let newJobData = this.props.jobList.filter((job) => {
            if (job.id === id) {
                job.status = newStatus
            }
            return job
        })*/
        let newJobData = this.state.jobs.filter((job) => {
            if (job.id === id) {
                job.oldStatus = job.status
                job.status = newStatus
            }
            return job
        })
        /*this.props.editJobs(newJobData)*/
        this.editJobs(newJobData)
        const newObj = {
            updated: true,
            /*updatedJob: this.props.jobList.find((job) => {
                if (job.id === id) {
                    return true
                }
            }),*/
            updatedJob: this.state.jobs.find((job) => {
                return job.id === id
            }),
            jobs: newJobData
        }
        axios.put("https://orbital-trackr.herokuapp.com/api/users/jobs", newObj)
    }

    togglePopup = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    deleteJobs = (id) => {
        const deletedJob = this.state.jobs.find(job => {
          return job.id === id
        })
        const filteredJobs = this.state.jobs.filter(job => {
          return job.id !== id
        });
        this.setState({
          jobs: filteredJobs
        })
        const newObj = {
          delete: true,
          updatedJob: deletedJob,
          jobs: filteredJobs
        }
        axios.put("https://orbital-trackr.herokuapp.com/api/users/jobs", newObj)
      }

      editExistingJob = (editedJob) => {
        const filteredJobs = this.state.jobs.filter(job => {
          return job.id !== editedJob.id
        })
        let newJobsArray = [...filteredJobs, editedJob]
        this.setState({
          jobs: newJobsArray
        })
        return newJobsArray
      }

      addNewJobs = (newJob) => {
        newJob.id = Math.random().toString()
        let newJobsArray = [...this.state.jobs, newJob]
        this.setState({
          jobs: newJobsArray
        })
        return newJobsArray
      }

      editJobs = (arr) => {
        this.setState({
          ...this.state,
          jobs: arr
        })
      }
        
        sortJobs = () => {
            axios.defaults.headers.common["authorization"] = localStorage.getItem('authtoken')
            axios.get("https://orbital-trackr.herokuapp.com/api/users/sortedJobs")
                .then(response => {             
                    this.setState({
                        jobs: response.data.jobs,
                    })
                })
                .catch(error => {

              })
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
            if (error.status === 401) {
                this.props.history.push("/login")
            }
        })
    } 

    render() {
        
        let jobData = {
            toApply: [],
            applied: [],
            interview: [],
            offer: []
        }

        this.state.jobs.forEach(job => {
            if (job.company) {
            jobData[job.status].push(
                <Thirdcard key={job.id} job={job} deleteJobs={this.deleteJobs} editExistingJob={this.editExistingJob}
                />
            );
            }
        });
        
        return(
            <div className="base board">
                    <div className="board-lists">
                        <div className="board-list" 
                            onDragOver= {(e) => this.onDragOver(e)}
                            onDrop= {(e) => this.onDrop(e, "toApply")}>
                            <div className="list-title">
                                To Apply
                            </div>
                            {jobData.toApply}
                            <button onClick={this.togglePopup}>
                                + Add job
                            </button>
                            <button onClick = {this.sortJobs}>
                                Sort on date
                            </button>
                        </div>
                        <div className="board-list"
                            onDragOver= {(e) => this.onDragOver(e)}
                            onDrop= {(e) => this.onDrop(e, "applied")}>
                            <div className="list-title">
                                Applied
                            </div>
                            {jobData.applied}
                            <button onClick={this.togglePopup}>
                                + Add job
                            </button>
                            <button onClick = {this.sortJobs}>
                                Sort on date
                            </button>
                        </div>
                        <div className="board-list"
                            onDragOver= {(e) => this.onDragOver(e)}
                            onDrop= {(e) => this.onDrop(e, "interview")}>
                            <div className="list-title">
                                Interview
                            </div>
                            {jobData.interview}
                            <button onClick={this.togglePopup}>
                                + Add job
                            </button>
                            <button onClick = {this.sortJobs}>
                                Sort on date
                            </button>
                        </div>
                        <div className="board-list"
                            onDragOver= {(e) => this.onDragOver(e)}
                            onDrop= {(e) => this.onDrop(e, "offer")}>
                            <div className="list-title">
                                Offered
                            </div>
                            {jobData.offer}
                            <button onClick={this.togglePopup}>
                                + Add job
                            </button>
                            <button onClick = {this.sortJobs}>
                                Sort on date
                            </button>
                        </div>
                        {/*{this.state.showForm ? 
                        <AddJobs addNewJobs={this.props.addNewJobs} closePopup={this.togglePopup}
                            username={this.props.username}
                        />
                        : null}*/}
                        {this.state.showForm ? 
                        <AddJobs addNewJobs={this.addNewJobs} closePopup={this.togglePopup}
                            username={this.props.username}
                        />
                        : null}
                    </div>
                </div>
        );
    }
}

export default Thirdboard