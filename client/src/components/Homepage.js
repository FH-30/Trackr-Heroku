import React from 'react'
import Board from "../board.png"
import "./Home.css"

const Homepage = (props) => {
  return (
      <div className="container">
        <div className="row">
          <div className="col s7 push-s5"> 
          </div>
          <div className="col s5 pull-s7">
            <h3 style={{color: "grey", fontSize: 60, fontFamily: "Palatino"}}>Organize <span style={{fontFamily: "Palatino"}}>your job search</span></h3>
            <p className="flow-text">No more messy spreadsheet. 
              Trackr keeps track of every detail on your job application.
              Integrate with your preferred job search engine for an even better experience.</p>
          </div>
        </div>
        <div className="row">
            <div class="card small">
              <div class="card-image">
                <img src={Board} />
                <span class="card-title" style={{color: "black"}}>Interactive</span>
              </div>
              <div class="card-content">
                <p>Organize your job search by using simple drag and drop features. 
                  Track them on each stage or switch to calendar view whenever needed.</p>
              </div>
            </div>
        </div>
        <div className="row">
            <div className="card small">
              <div className="card-image">
                <img src={Board} />
                <span class="card-title" style={{color: "black"}}>Reminders</span>
              </div>
              <div className="card-content">
                <p className="center">No more missed deadline on job application. Trackr sends you reminders
                  on approaching application deadline and interview schedule.</p>
              </div>
            </div>
        </div>
        <div className="row">
            <div className="card small">
              <div className="card-image">
                <img src={Board} />
                <span class="card-title" style={{color: "black"}}>Integrate</span>
              </div>
              <div className="card-content">
                <p className="center">Integrate your LinkedIn account with Trackr. 
                This way, your bookmark on LinkedIn job search will be automatically added into your board. </p>
              </div>
            </div>
        </div>
      </div>
  )
}

export default Homepage