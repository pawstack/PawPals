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
  }

  updatePhone(e) {
    const phone = e.target.value;
    this.props.entriesChanged( this, 'phone', phone );
  }

  updateAddress(e) {
    const address = e.target.value;
    this.props.entriesChanged( this, 'address', address );
  }

  render() {
    return (
      <Router>
        <div>
          <div>Step 1</div>
          <div>Phone # <input onChange = {this.updatePhone.bind(this)}></input></div>
          <div>Address <input onChange = {this.updateAddress.bind(this)}></input></div>
        </div>
      </Router>
    );
  }
}

export default SignUpDataEntry;
