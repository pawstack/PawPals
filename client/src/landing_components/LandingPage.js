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
import $ from 'jquery';
import LandingHome from './LandingHome';
import LandingTeam from './LandingTeam';
import '../../../public/landing.css';


class LandingPage extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <Router>
        <div className="row align-items-start justify-content-between landing-top">

          <div className="col-sm-4">
            <span>

              <img src="https://i.imgur.com/ptBHSFz.png" style={{"width":"5vw","marginLeft":"225px","marginTop":"-2%"}}></img>

            </span>
            <span className="landing-title">
            PawPals
            </span>
          </div>

          <div className="col-sm-8">
            <nav className="landing-nav">
              <ul className="navbar-nav">
                <li className="nav-item"><Link to="/login" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/team" className="nav-link">Our Team</Link></li>
                <li className="nav-item">
                  <center><a href="/auth/google" className="nav-link"><img style={{width: 230, marginTop: '-20px'}} src="https://www.rallynavigator.com/assets/google_oauth2-login-button-9da4ac95125e023504fe0d9db96c94f0.png" /></a></center>
                </li>
              </ul>
            </nav>
          </div>
          <Route exact path="/login" component={LandingHome}/>
          <Route exact path="/team" component={LandingTeam}/>
        </div>
      </Router>
    )
  }
}

export default LandingPage;





