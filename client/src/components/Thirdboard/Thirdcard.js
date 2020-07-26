import React, { Component } from 'react'
import "./Thirdboard.css"
import EditJobs from "../EditJobs.js"
import axios from 'axios'

class Thirdcard extends Component {

    state = {
        editForm: false,
    }

    onDragStart = (e, id) => {
        e.dataTransfer.setData("id", id)
    }

    toggleEdit = () => {
        this.setState({
            editForm: !this.state.editForm
        })
    }

    render() {
        if (this.props.job.status === "toApply") {
            let schedule;
            if (this.props.job.interviewDate !== "T") {
                schedule = <p className="jobcard-content"> Apply by: {this.props.job.interviewDate.split("T")[0]} [{this.props.job.interviewDate.split("T")[1]}] </p> 
            } else {
                schedule = <p className="jobcard-content"></p>
            }
            let logourl;
            if (this.props.job.logo) {
                logourl = <img src={this.props.job.logo} style={{float: "right", borderRadius: "70%"}} />
            }
        return(
        <div key={this.props.job.id}
        draggable={!this.state.editForm}
        onDragStart={(e) => this.onDragStart(e, this.props.job.id)}
        className="jobcard-toApply">
        <p className="jobcard-title"> {logourl} {this.props.job.company} </p>
        <p className="jobcard-content"> {this.props.job.role} </p>
        {schedule}
        <i className="tiny material-icons right"  onClick={() => this.props.deleteJobs(this.props.job.id)}>delete</i>
        <i className="tiny material-icons right" onClick={this.toggleEdit}>border_color</i> 
        { this.state.editForm ? 
        <EditJobs job={this.props.job} closeEditForm={this.toggleEdit} 
            editExistingJob={this.props.editExistingJob}
        /> : null }
        </div>)
        } else if (this.props.job.status === "applied") {
            let schedule;
            if (this.props.job.interviewDate !== "T") {
                schedule = <p className="jobcard-content"> Applied on: {this.props.job.interviewDate.split("T")[0]} [{this.props.job.interviewDate.split("T")[1]}] </p> 
            } else {
                schedule = <p className="jobcard-content"></p>
            }
            return(
                <div key={this.props.job.id}
                draggable={!this.state.editForm}
                onDragStart={(e) => this.onDragStart(e, this.props.job.id)}
                className="jobcard-applied">
                <p className="jobcard-title"> <img src={this.props.job.logo} style={{float: "right", borderRadius: "50%"}} /> {this.props.job.company} </p>
                <p className="jobcard-content"> {this.props.job.role} </p>
                {schedule}
                <i className="tiny material-icons right"  onClick={() => this.props.deleteJobs(this.props.job.id)}>delete</i>
                <i className="tiny material-icons right" onClick={this.toggleEdit}>border_color</i> 
                { this.state.editForm ? 
                <EditJobs job={this.props.job} closeEditForm={this.toggleEdit} 
                    editExistingJob={this.props.editExistingJob}
                /> : null }
                </div>)
        } else if (this.props.job.status === "interview") {
            let schedule;
            if (this.props.job.interviewDate !== "T") {
                schedule = <p className="jobcard-content"> Interview on: {this.props.job.interviewDate.split("T")[0]} [{this.props.job.interviewDate.split("T")[1]}] </p> 
            } else {
                schedule = <p className="jobcard-content"></p>
            }
            return(
                <div key={this.props.job.id}
                draggable={!this.state.editForm}
                onDragStart={(e) => this.onDragStart(e, this.props.job.id)}
                className="jobcard-interview">
                <p className="jobcard-title"> <img src={this.props.job.logo} style={{float: "right", borderRadius: "50%"}} /> {this.props.job.company} </p>
                <p className="jobcard-content"> {this.props.job.role} </p>
                {schedule}
                <i className="tiny material-icons right"  onClick={() => this.props.deleteJobs(this.props.job.id)}>delete</i>
                <i className="tiny material-icons right" onClick={this.toggleEdit}>border_color</i> 
                { this.state.editForm ? 
                <EditJobs job={this.props.job} closeEditForm={this.toggleEdit} 
                    editExistingJob={this.props.editExistingJob}
                /> : null }
                </div>)
        } else {
            let schedule;
            if (this.props.job.interviewDate !== "T") {
                schedule = <p className="jobcard-content"> Accept offer by: {this.props.job.interviewDate.split("T")[0]} [{this.props.job.interviewDate.split("T")[1]}] </p> 
            } else {
                schedule = <p className="jobcard-content"></p>
            }
            return(
                <div key={this.props.job.id}
                draggable={!this.state.editForm}
                onDragStart={(e) => this.onDragStart(e, this.props.job.id)}
                className="jobcard-offer">
                <p className="jobcard-title"> <img src={this.props.job.logo} style={{float: "right", borderRadius: "50%"}} /> {this.props.job.company} </p>
                <p className="jobcard-content"> {this.props.job.role} </p>
                {schedule}
                <i className="tiny material-icons right"  onClick={() => this.props.deleteJobs(this.props.job.id)}>delete</i>
                <i className="tiny material-icons right" onClick={this.toggleEdit}>border_color</i> 
                { this.state.editForm ? 
                <EditJobs job={this.props.job} closeEditForm={this.toggleEdit} 
                    editExistingJob={this.props.editExistingJob}
                /> : null }
                </div>)
        }
    }

}

export default Thirdcard