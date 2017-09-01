import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import OwnerRegister from './OwnerRegister';
import WalkerRegister from './WalkerRegister';


class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Router>
        <div>
          <div>Step 1</div>
          <div>Phone # <input></input></div>
          <div>Address <input></input></div>
          <div><Link to = "/ownerresgister">Owner</Link></div>
          <div><Link to = "/walkerresgister" >Walker</Link></div>
          <Route exact path="/ownerresgister" component={OwnerRegister}/>
          <Route exact path="/walkerresgister" component={WalkerRegister}/>
        </div>
      </Router>
    );
  }
}

export default SignUp;

