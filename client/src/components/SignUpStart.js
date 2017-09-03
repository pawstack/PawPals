import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { IndexRedirect } from 'react-router';
import WalkerRegister from './WalkerRegister';
import OwnerRegister from './OwnerRegister';
import SignUpDataEntry from './SignUpDataEntry';


class SignUpStart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone:""
    };
  }

  render() {
    return (
      <Router>
        <div>
          <div><Link to = "/signup/owner">Owner</Link></div>
          <div><Link to = "/signup/walker">Walker</Link></div>
          <Switch>
            <Route exact path="/signup/start" component={SignUpDataEntry}/>
            <Route exact path="/signup/owner" component={OwnerRegister}/>
            <Route exact path="/signup/walker" component={WalkerRegister}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default SignUpStart;

