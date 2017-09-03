import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

class SignUpDataEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    };
  }

  updatePhone(e) {
    this.setState({phone: e.target.value}),
    ()=>{
      this.props.handlePhoneUpdate( this );
    };
  }

  render() {
    return (
      <Router>
        <div>
          <div>Step 1</div>
          <div>Phone # <input onChange = {this.updatePhone.bind(this)}></input></div>
          <div>Address <input></input></div>
        </div>
      </Router>
    );
  }
}

export default SignUpDataEntry;
