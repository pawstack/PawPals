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
            </div>

            <div className="col-md-6"><img src="https://image.flaticon.com/icons/svg/237/237066.svg" className='landing-icon'></img>
              <div className='icon-title'>Tiffany Choy</div>
              <div className='icon-text'>
                Make and receive payment securely through the app.
              </div>
            </div>
          </div>
          <div className="row team-container">
            <div className="col-md-6"><img src="https://image.flaticon.com/icons/svg/235/235861.svg" className='landing-icon'></img>
              <div className='icon-title'>Martin Chang</div>
              <div className='icon-text'>
                Real time tracking of dog during the walk.
              </div>
            </div>

            <div className="col-md-6">
              <img src="https://i.pinimg.com/originals/83/58/1c/83581c5e0cb7d83fee4a2e44083637a2.png" className='landing-icon'>
              </img>
              <div className='icon-title'>Nova Qiu</div>
              <div className='icon-text'>
                Instant chat in app for users for smooth communication.
              </div>
            </div>

          </div>
        </div>
  )
  }

}

export default LandingTeam;