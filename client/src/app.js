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
import openSocket from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
import Messages from './components/Messages';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import NavBarOwnerLoggedIn from './components/NavBarOwnerLoggedIn.jsx';
import NavBarWalkerLoggedIn from './components/NavBarWalkerLoggedIn.jsx';
import NavBarNewUserLoggedIn from './components/NavBarNewUserLoggedIn.jsx';
import '../../public/componentCSS/app.css';

const font = "'Pontano Sans', sans-serif";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#66BB6A',
    pickerHeaderColor: '#66BB6A',
  },
  fontFamily: font
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      userInfo: {},
      walker: false,
      owner: false
    };
    this.socket = openSocket();
    this.retrieveUserInfo = this.retrieveUserInfo.bind(this);
  }

  retrieveUserInfo() {
    $.get('/api/walks/getOwnerInfo')
      .done((data) => {
        if (data.walker) {
          this.setState({
            userInfo: data,
            walker: true
          });
        } else if (data.owner) {
          this.setState({
            userInfo: data,
            owner: true
          });
        }
      })
      .fail((err) => {
        console.log('ERROR retreiving ownerInfo ', err);
      });
  }

  componentDidMount() {
    this.retrieveUserInfo();
    $('.container').find('h1').css("font-family", "'Carter One', cursive");
  }

  render() {
    if (!this.state.owner && ! this.state.walker || !this.state.userInfo.customer_id_cc_Token) {
      return (
        <div>
          <Router>
            <MuiThemeProvider muiTheme={muiTheme}>
              <div>
                <AppBar
                  title="PawPals"
                  iconElementRight = {<NavBarNewUserLoggedIn />}
                  showMenuIconButton={false}
                />
                <Route exact path="/signup/start" component={SignUpStart}/>
              </div>
            </MuiThemeProvider>
          </Router>
        </div>
      );

    } else {
      return (
        <div>
          <Router>
            <MuiThemeProvider muiTheme={muiTheme}>
              <div>
                <AppBar
                  title="PawPals"
                  iconElementLeft={
                    <Avatar
                      src={this.state.userInfo.profile_pic}
                      style={{marginBottom: 4}} />
                  }
                  iconStyleLeft={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
                  iconElementRight={this.state.owner ? <NavBarOwnerLoggedIn /> : <NavBarWalkerLoggedIn />}
                />
                <Route exact path="/signup/start" component={SignUpStart}/>
                <Route exact path="/browse" component={Browse}/>
                <Route exact path="/walker" component={Calendar}/>
                <Route exact path="/profilepage/owner" component={ProfileOwner}/>
                <Route exact path="/profilepage/walker" component={ProfileWalker}/>
                <Route exact path="/findmydog" component={FindMyDog}/>
                <Route exact path="/trackwalk" component={TrackWalk}/>
                <Route exact path="/walkhistory" component={WalkHistory}/>
                <Route exact path='/messages' render={(props) => (
                  <Messages socket={this.socket} {...props} />
                )}/>
              </div>
            </MuiThemeProvider>

          </Router>
        </div>

      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
