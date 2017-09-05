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
      phone: '',
      address: ''
    };
  }


  handleEntriesChanged( component, valueType, value ) {
    this.setState( { [valueType]: value } );
  }

  render() {
    return (
      <Router>
        <div>
          <div>
            <Link to = "/signup/owner">Owner</Link>
          </div>
          <div>
            <Link to = "/signup/walker">Walker</Link>
          </div>

          <Switch>
            <Route exact path = "/signup/start" render = {()=>
              <SignUpDataEntry entriesChanged = {this.handleEntriesChanged.bind(this)}/>
            }/>
            <Route exact path = "/signup/owner" render = {()=>
              <OwnerRegister phoneInfo={this.state.phone}/>
            }/>
            <Route exact path = "/signup/walker" render = {()=>
              <WalkerRegister phoneInfo={this.state.phone}/>
            }/>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default SignUpStart;

