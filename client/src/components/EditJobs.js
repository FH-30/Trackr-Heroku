import React , { Component } from 'react'
import axios from 'axios';
import "./Thirdboard/Thirdboard.css"
import M from "materialize-css"
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";


class EditJobs extends Component {
    state = {
        company: this.props.job.company,
        role: this.props.job.role,
        oldStatus: this.props.job.status,
        status: this.props.job.status,
        schedule: this.props.job.interviewDate.split("T")[0],
        time: this.props.job.interviewDate.split("T")[1],
        place: this.props.job.place,
        coordinates: this.props.job.coordinates,
        id: this.props.job.id,
        logo: '',
        errors: []
    };

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

    handleChangePlace = address => {
        this.setState({place: address});
    };
     
    handleSelect = async address => {
        const results = await geocodeByAddress(address)
        const latLng = await getLatLng(results[0])
        this.setState({
            place: address,
            coordinates: latLng
        })
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

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.company !== '' && this.state.role === '' && this.state.status === '') {
            this.setState({
                errors: {role: "Role field is required", status: "Status field is required"}
            })
        } else if (this.state.company === '' && this.state.role !== '' && this.state.status === '') {
            this.setState({
                errors: {company: "Company field is required", status: "Status field is required"}
            })
        } else if (this.state.company === '' && this.state.role === '' && this.state.status !== '') {
            this.setState({
                errors: {company: "Company field is required", role: "Role field is required"}
            })
        } else if (this.state.company === '' && this.state.role !== '' && this.state.status !== '') {
            this.setState({
                errors: {company: "Company field is required"}
            })
        } else if (this.state.company !== '' && this.state.role === '' && this.state.status !== '') {
            this.setState({
                errors: {role: "Role field is required"}
            })
        } else if (this.state.company !== '' && this.state.role !== '' && this.state.status === '') {
            this.setState({
                errors: {status: "Status field is required"}
            })
        } else if (this.state.company !== '' && this.state.role === '' && this.state.status === '') {
            this.setState({
                errors: {company: "Company field is required", role: "Role field is required", status: "Status field is required"}
            })
        } else {
        axios.get("https://orbital-trackr.herokuapp.com/api/users/logo/" + this.state.company)
            .then(res => {
                if (res.data.logo) {
                    this.setState({
                        logo: res.data.logo + "?size=45"
                })} 
                const editedJob = {
                    company: this.state.company,
                    role: this.state.role,
                    oldStatus: this.state.oldStatus,
                    status: this.state.status,
                    interviewDate: this.state.schedule + "T" + this.state.time,
                    place: this.state.place,
                    coordinates: this.state.coordinates,
                    id: this.state.id,
                    logo: this.state.logo
                }
                console.log(editedJob)
                const newArr = this.props.editExistingJob(editedJob) 
                const newObj = {
                    updated: true,
                    updatedJob: editedJob,
                    jobs: newArr
                }
                this.putNewObj(newObj)
                    .then(res => {
                        if (res) {
                            console.log("run")
                            this.props.closeEditForm()
                        }
                })
            })
            .catch(err => {
                this.setState({
                    errors: {company: "Company field is required"}
                })
                if (this.state.role === "") {
                    this.setState({
                        errors: {company: "Company field is required", role: "Role field is required"}
                    })
                }
            })
        }
    }

    componentDidMount() {
        M.AutoInit()
    }

    render() {
        let timeInput;
        if (this.state.schedule) {
            timeInput = 
            <div className="input-field col s6">
                <i className="material-icons prefix"></i>
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
                        <div className="input-field col s12 l6">
                            <i className="material-icons prefix">work</i>
                            <input id="company" type="text" className="validate"
                                name="company" value={this.state.company} onChange={this.handleChange} autoComplete="off"/>
                            <label htmlFor="company"></label>
                            <p style={{color: "#a82424"}}>{ this.state.errors.company } </p>
                        </div>
                        <div className="input-field col s12 l6">
                            <i className="material-icons prefix">location_on</i>
                            <PlacesAutocomplete
                                value={this.state.place}
                                onChange={this.handleChangePlace}
                                onSelect={this.handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <input
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                        );
                                    })}
                                    </div>
                                </div>
                                )}
                            </PlacesAutocomplete>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">person</i>
                            <input id="role" type="text" className="validate" 
                                name="role" value={this.state.role} onChange={this.handleChange} autoComplete="off"/>
                            <label htmlFor="role"></label>
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
                            <i className="material-icons prefix">access_alarm</i>
                            <input id="schedule" type="date" 
                                name="schedule" value={this.state.schedule} onChange={this.handleChange}
                                autoComplete="off" /> 
                            <label htmlFor="schedule"></label>
                        </div>
                        {timeInput}
                    </div>
                    <button class="btn teal" type="submit" name="action">Edit
                            <i class="material-icons right">send</i></button>
                    <button onClick={this.props.closeEditForm} className="right small btn grey">x</button>
                </form>
            </div>
            </div>
            </div>
        )
    }
}

export default EditJobs