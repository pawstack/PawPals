import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import SignUpStart from './components/SignUpStart';
import NavBarNewUserLoggedIn from '../src/components/NavBarNewUserLoggedIn.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import '../../public/componentCSS/stripe.css';
import $ from 'jquery';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#66BB6A',
  },
});

class Stripe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    $('.container').find('h1').css("font-family", "'Carter One', cursive");
  }
  render() {
    return (
      <div>
        <Router>
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              <div className = 'appBar'>
                <AppBar
                  title="PawPals"
                  iconElementRight = {<NavBarNewUserLoggedIn />}
                  showMenuIconButton={false}
                />
              </div>

              <div><br></br><br></br></div>
              <div className = 'descriptionText'>
                PawPals thanks you for signing up with Stripe.
                <br /> <br /> 
                Please save your card details here to book / schedule instantly later!
                <br />
              </div>
              <Route exact path="/signup/start" component={SignUpStart}/>
            </div>
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

if (module.parent) {
  module.exports = Stripe;
} else {
  ReactDOM.render(<Stripe />, document.getElementById('stripe-root'));
}
