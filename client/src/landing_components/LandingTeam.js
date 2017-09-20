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
import '../../../public/componentCSS/landing.css';


class LandingTeam extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return(
      <div className="container icon-container team-main-container">

          <div className="row team-container">

          <div className="col-md-6">
              <img src="https://i.imgur.com/5W2eCj2.png" className='team-icon'></img>
              <div className='icon-title'>
                Young Lu
                <span className='contact-icon-span'><a href="https://www.linkedin.com/in/yanglu3/"><img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img" alt="linkedin"></img></a></span>
                <span className='contact-icon-span'><a href="https://github.com/youngyanglu"><img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img" alt="github"></img></a></span>
              </div>
              <div className='icon-text'>
                Calender system to easily schedule and book walks.
              </div>
            </div>


            <div className="col-md-6">
              <img src="https://i.imgur.com/csArLVO.png" className='team-icon'></img>
              <div className='icon-title'>
                Tiffany Choy
                <span className='contact-icon-span'><a href="https://www.linkedin.com/in/tiffany-choy/"><img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img" alt="linkedin"></img></a></span>
                <span className='contact-icon-span'><a href="https://github.com/tiffanycchoy"><img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img" alt="github"></img></a></span>
              </div>
              <div className='icon-text'>
                Calender system to easily schedule and book walks.
              </div>
            </div>

          </div>


          <div className="row team-container">

            <div className="col-md-6">
              <img src="https://i.imgur.com/0yH6RXp.jpg" className='team-icon'></img>
              <div className='icon-title'>
                Martin Chang
                <span className='contact-icon-span'><a href="https://www.linkedin.com/in/martinkchang/"><img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img" alt="linkedin"></img></a></span>
                <span className='contact-icon-span'><a href="https://github.com/mkchang"><img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img" alt="github"></img></a></span>
              </div>
              <div className='icon-text'>
                Calender system to easily schedule and book walks.
              </div>
            </div>

            <div className="col-md-6"><img src="https://i.imgur.com/v7StMZS.jpg" className='team-icon'></img>
              <div className='icon-title'>
                Nova Qiu
                <span className='contact-icon-span'><a href="https://www.linkedin.com/in/noqiu/"><img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img" alt="linkedin"></img></a></span>
                <span className='contact-icon-span'><a href="https://github.com/novyQ"><img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img" alt="github"></img></a></span>
              </div>
              <div className='icon-text'>
                Calender system to easily schedule and book walks.
              </div>
            </div>
          </div>

        </div>
  )
  }

}

export default LandingTeam;