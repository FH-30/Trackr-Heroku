import React, { Component } from 'react'
import M from "materialize-css/dist/js/materialize.min.js";
import Clement from "./lpimage/clement2.png"
import Francis from "./lpimage/francis.jpg"
import Job1 from "./lpimage/job1.jpg"
import Job2 from "./lpimage/job2.jpg"
import Job3 from "./lpimage/job3.jpg"
import Job4 from "./lpimage/job4.jpg"

class LandingPage extends Component {
    componentWillMount() {
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, {});
        });
    }

    render() {
        return (
            <div> 
                <div className="slider">
                    <ul className="slides">
                        <li>
                            <img src={Job1} /> 
                            <div class="caption center-align">
                                <h3 class="light grey-text text-lighten-5">Organize your job search</h3>
                                <h5 class="light grey-text text-lighten-3">Neatly. Interactively. Easily.</h5>
                            </div>
                        </li>
                        <li>
                            <img src={Job2} /> 
                            <div class="caption left-align">
                                <h3 class="light grey-text text-lighten-3">Get your scheduled reminders</h3>
                                <h5 class="light grey-text text-lighten-3">No more missed deadline and interview</h5>
                            </div>
                        </li>
                        <li>
                            <img src={Job3}  /> 
                            <div class="caption right-align">
                                <h3 className="light grey-text text-darken-3">Tidy up your job applications</h3>
                                <h5 className="light grey-text text-darken-3">Say no to messy spreadsheet</h5>
                            </div>
                        </li>
                        <li>
                            <img src={Job4}  /> 
                            <div class="caption center-align">
                                <h3>Integrate with your professional profile</h3>
                                <h5 class="light grey-text text-lighten-3">Use LinkedIn for better experience</h5>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col s12 m12 l4 center-align">
                            <i className="large material-icons teal-text text-darken-3">developer_board</i>
                            <br></br>
                            Drag and drop feature to ease you organizing your job applications record.
                            Simply move items in between different stages and get them updated and saved 
                            in your database.
                        </div>
                        <div className="col s12 m12 l4 center-align">
                            <i className="large material-icons teal-text text-darken-3">access_alarms</i>
                            <br></br>
                            Set your date and time for your job application accordingly. 
                            Get your reminders sent through your email when deadline and 
                            interview is approaching.
                        </div>
                        <div className="col s12 m12 l4 center-align">
                            <i className="large material-icons teal-text text-darken-3">assignment_ind</i>
                            <br></br>
                            Integrate with your professional job search account.
                            This way, your job applications can be added automatically for a better
                            experience.
                        </div>
                    </div>
                </div>

                {/*<div className="container">
                    <div className="row">
                        <h1 className="center"> Meet our team </h1>
                        <div class="row">
                            <div class="col s12 m12 l6">
                                <div class="card blue-grey lighten-4">
                                    <div class="card-image">
                                        <img className="responsive-img" src={Clement} />
                                    </div>
                                    <div class="card-content center">
                                        <span class="card-title center"><b>Clement Harsoyo</b></span>
                                        <p><i>Founder</i></p>
                                    </div>
                                    <div class="card-action">
                                        <p> Clement is National University of Singapore undergraduate in 
                                        Business Analytics programme. He is currently the Front End Developer 
                                        of Trackr. He has interest in sports, travelling, and music.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12 m12 l6">
                                <div class="card blue-grey lighten-4">
                                    <div class="card-image">
                                        <img className="responsive-img" src={Francis}/>
                                    </div>
                                    <div class="card-content center">
                                        <span class="card-title center"><b>Francis Hodianto</b></span>
                                        <p><i>Founder</i></p>
                                    </div>
                                    <div class="card-action">
                                        <p> Francis is National University of Singapore undergraduate in 
                                        Computer Science programme. He is currently the Back End Developer 
                                        of Trackr. He has interest in politics, sports, and social works.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>
        )
    }
}

export default LandingPage