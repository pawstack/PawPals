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

if (module.parent) {
  module.exports = Login;
} else {
  ReactDOM.render(<Login />, document.getElementById('login-root'));
}