import React , { Component } from 'react'
import axios from 'axios';
import "./Thirdboard/Thirdboard.css"
import M from "materialize-css"
import { GoogleComponent } from 'react-google-location'
import { DatePicker } from "react-materialize";

class AddJobs extends Component {
    state = {
        company: '',
        role: '',
        status: '',
        schedule: '',
        time: '',
        logo: '',
        place: '',
        coordinates: [],
        errors: [],
        key: ''
    };

    putNewObj = (newObj) => {
        return axios
                .put("https://orbital-trackr.herokuapp.com/api/users/jobs", newObj)
                .then(res => {
                    return res.data
                    }
                )
                .catch(err => { 
                    this.setState({
                        errors: err.response.data
                    }) 
                })
    }

    handleChange = (e) => {
        let target = e.target;
        let value = target.value;
        let stateName = target.name;

        if (stateName === 'schedule') {
            this.setState({
                schedule: value,
                time: '00:00'
            })
        } else { 
            this.setState({
            [stateName]: value
        })

        }
    }

    handleDate = () => {
        this.setState({
            schedule: this.state.schedule.target.value
        })
    }

    formatDate = (date) => {
        const months = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
        }
    
        const day = date[5] === "," ? "0" + date[4] : date.slice(4, 6);
        const month = months[date.slice(0, 3)];
        const year = day[0] === "0" ? date.substring(7) : date.substring(8);
        const h = "-";
    
        return year + h + month + h + day;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.get("https://orbital-trackr.herokuapp.com/api/users/logo/" + this.state.company)
            .then(res => {
                if (res.data.logo) {
                    this.setState({
                        logo: res.data.logo + "?size=45"
                    })
                }
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data
                })
            })
            .finally(() => {
                const newJob = {
                    company: this.state.company,
                    role: this.state.role,
                    status: this.state.status,
                    interviewDate: this.state.schedule + "T" + this.state.time,
                    place: this.state.place,
                    coordinates: this.state.coordinates,
                    logo: this.state.logo
                }
                const newArr = this.props.addNewJobs(newJob) 
                const newObj = {
                    add: true,
                    updatedJob: newJob,
                    jobs: newArr
                }
                this.putNewObj(newObj)
                    .then(res => {
                        if (res) {
                            this.props.closePopup()
                        }
                    })
                this.setState({
                    company: '',
                    role: '',
                    status: '',
                    schedule: '',
                    time: '',
                    place: '',
                    coordinates: [],
                    logo: ''
                })
            })
    }

    componentDidMount() {
        M.AutoInit()
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.datepicker');
            M.Datepicker.init(elems, {
                format: "mm/dd/yyyy",
            })
        });
        axios.get(axios.get("https://orbital-trackr.herokuapp.com/api/users/googleAPIKey")
        .then(res => {
            this.setState({key: res.data.API_Key})}))
      }

    render() {
        let timeInput;
        if (this.state.schedule) {
            timeInput = 
            <div className="input-field col s6">
                <input id="time" type="time"
                    name="time" value={this.state.time} onChange={this.handleChange}
                    autoComplete="off" />
                <label htmlFor="time"></label>
            </div>
        }
        return (
            <div className='popup'>
            <div className='popup_inner'>
            <div className="row">
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">work</i>
                            <input id="company" type="text" className="validate"
                                name="company" value={this.state.company} onChange={this.handleChange} autoComplete="off"/>
                            <label htmlFor="company">Company</label>
                            <p style={{color: "#a82424"}}>{ this.state.errors.company } </p>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix">location_on</i>
                            <GoogleComponent
                            apiKey={this.state.key}
                            language={'en'}
                            coordinates={true}
                            locationBoxStyle={'custom-style'}
                            locationListStyle={'custom-style-list'}
                            onChange={(e) => { this.setState({ coordinates: e.coordinates,
                                                                place: e.place }) }} 
                            />
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">person</i>
                            <input id="role" type="text" className="validate" 
                                name="role" value={this.state.role} onChange={this.handleChange} autoComplete="off"/>
                            <label htmlFor="role">Role</label>
                            <p style={{color: "#a82424"}}>{ this.state.errors.role } </p>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">sms</i>
                            <select id="status" name="status"
                                value={this.state.status} onChange={this.handleChange} autoComplete="off">
                                <option value="" disabled selected>Status</option>
                                <option value="toApply">To Apply</option>
                                <option value="applied">Applied</option>
                                <option value="interview">Interview</option>
                                <option value="offer">Offer</option>
                            </select>
                            <label htmlFor="status"></label>
                            <p style={{color: "#a82424"}}>{ this.state.errors.status } </p>
                        </div>
                        <div className="input-field col s6">
                            <i className="material-icons prefix">date_range</i>
                            <input id="schedule" type="date"
                                name="schedule" value={this.state.schedule}
                                onChange={this.handleChange}
                                autoComplete="off" /> 
                            <label htmlFor="schedule"></label>
                        </div>
                        {/*<div className="input-field col s6">
                            <i className="material-icons prefix">access_alarm</i>
                            <DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={this.state.schedule}
                            onChange={this.handleChangeDate}
                            />
                        </div>*/}
                        {timeInput}
                    </div>
                    <button class="btn teal" type="submit" name="action">Add
                            <i class="material-icons right">send</i></button>
                    <button onClick={this.props.closePopup} className="right small btn grey">x</button>
                </form>
            </div>
            </div>
            </div>
        )
    }
}

export default AddJobs