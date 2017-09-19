import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import $ from 'jquery';


class LandingTeam extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return(
      <div className="container icon-container team-main-container">

          <div className="row team-container">

            <div className="col-md-6"><img src="https://cdn0.iconfinder.com/data/icons/time-icons-rounded/110/Calendar-Time-512.png" className='landing-icon'></img>
              <div className='icon-title'>Young Lu</div>
              <div className='icon-text'>
                Calender system to easily schedule and book walks.
              </div>
              <div className="contact-icon-container">
                  <div>
                    <img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img"></img>
                  </div>
                  <div><br></br></div>
                  <div>
                    <img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img"></img>
                  </div>
              </div>
            </div>

            <div className="col-md-6"><img src="https://cdn0.iconfinder.com/data/icons/time-icons-rounded/110/Calendar-Time-512.png" className='landing-icon'></img>
              <div className='icon-title'>Tiffany Choy</div>
              <div className='icon-text'>
                Calender system to easily schedule and book walks.
              </div>
              <div className="contact-icon-container">
                  <div>
                    <img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img"></img>
                  </div>
                  <div><br></br></div>
                  <div>
                    <img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img"></img>
                  </div>
              </div>
            </div>

          </div>

          <div className="row team-container">

            <div className="col-md-6"><img src="https://cdn0.iconfinder.com/data/icons/time-icons-rounded/110/Calendar-Time-512.png" className='landing-icon'></img>
              <div className='icon-title'>Martin Chang</div>
              <div className='icon-text'>
                Calender system to easily schedule and book walks.
              </div>
              <div className="contact-icon-container">
                  <div>
                    <img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img"></img>
                    <span><a href="https://github.com/mkchang">https://github.com/mkchang</a></span>
                  </div>
                  <div><br></br></div>
                  <div>
                    <img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img"></img>
                      <span><a href="https://www.linkedin.com/in/martinkchang">https://www.linkedin.com/in/martinkchang/</a></span>
                  </div>
              </div>
            </div>

            <div className="col-md-6"><img src="https://cdn0.iconfinder.com/data/icons/time-icons-rounded/110/Calendar-Time-512.png" className='landing-icon'></img>
              <div className='icon-title'>Nova Qiu</div>
              <div className='icon-text'>
                Calender system to easily schedule and book walks.
              </div>
              <div className="contact-icon-container">
                  <div>
                    <img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img"></img>
                  </div>
                  <div><br></br></div>
                  <div>
                    <img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img"></img>
                  </div>
              </div>
            </div>
          </div>

        </div>
  )
  }

}

export default LandingTeam;