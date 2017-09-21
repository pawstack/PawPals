import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import LandingPage from './landing_components/LandingPage';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MuiThemeProvider>
          <div>
            <LandingPage/>
          </div>
      </MuiThemeProvider>
    );

  }
}

ReactDOM.render(<Login />, document.getElementById('login-root'));

/*<center><a style={{marginLeft: 15, marginRight: 15}} href="/auth/google"><img style={{width: 250}} src="/assets/google-logo.png" /></a></center>*/

