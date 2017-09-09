import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SignUpStart from './components/SignUpStart';
import Browse from './components/Browse';
import Calendar from './components/Calendar';
import Payment from './components/Payment.jsx';
import ProfileOwner from './components/ProfileOwner';
import ProfileWalker from './components/ProfileWalker';
import Confirmation from './components/Confirmation.jsx';
import FindMyDog from './components/FindMyDog';
import TrackWalk from './components/TrackWalk';
import WalkHistory from './components/WalkHistory';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import NavBarOwnerLoggedIn from './components/NavBarOwnerLoggedIn.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      userInfo: {}
    };
    this.retrieveUserInfo = this.retrieveUserInfo.bind(this);
  }

  retrieveUserInfo() {
    $.get('/api/walks/getOwnerInfo')
      .done((data) => {
        console.log('SUCCESS - the owner info is ', data);
        this.setState({
          userInfo: data
        }, function() {
          console.log('SUCCESS - the user info is ', this.state.userInfo);
        });
      })
      .fail((err) => {
        console.log('ERROR retreiving ownerInfo ', err);
      });
  }


  componentDidMount() {
    this.retrieveUserInfo();
  }

  render() {
    console.log('the state inside of render is ', this.state.userInfo.display);
    return (
      <div>

        <MuiThemeProvider>
          <div>
            <AppBar
              title={this.state.userInfo.display}
              iconElementRight = {<NavBarOwnerLoggedIn />}
            />
          </div>


        </MuiThemeProvider>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));



/*

<Router>
  <div>
    <h3>test2</h3>
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to='/signup/start'>Signup</Link></li>
      <li><Link to='/browse'>Browse Walks</Link></li>
      <li><Link to='/walker'>Walker</Link></li>
      <li><Link to='/profilepage/owner'>Owner Profile Page</Link></li>
      <li><Link to='/profilepage/walker'>Walker Profile Page</Link></li>
    </ul>

    <Route exact path="/home" render={() => (
      <h1>Hello World from React</h1>
    )}/>
    <Route exact path="/signup/start" component={SignUpStart}/>
    <Route exact path="/browse" component={Browse}/>
    <Route exact path="/walker" component={Calendar}/>
    <Route exact path="/profilepage/owner" component={ProfileOwner}/>
    <Route exact path="/profilepage/walker" component={ProfileWalker}/>
  </div>
</Router>

*/
