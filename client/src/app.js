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
import Avatar from 'material-ui/Avatar';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import NavBarOwnerLoggedIn from './components/NavBarOwnerLoggedIn.jsx';
import NavBarWalkerLoggedIn from './components/NavBarWalkerLoggedIn.jsx';
import NavBarNewUserLoggedIn from './components/NavBarNewUserLoggedIn.jsx';
import Message from './components/Message';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      userInfo: {},
      walker: false,
      owner: false
    };
    this.retrieveUserInfo = this.retrieveUserInfo.bind(this);
  }

  retrieveUserInfo() {
    $.get('/api/walks/getOwnerInfo')
      .done((data) => {
        console.log('SUCCESS - the owner info is ', data);
        if (data.walker) {
          //console.log('the user is a walker ', data.walker);
          this.setState({
            userInfo: data,
            walker: true
          });
        } else if (data.owner) {
          //console.log('the user is a owner ', data.owner);
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
  }

  render() {
    if (!this.state.owner && ! this.state.walker || !this.state.userInfo.customer_id_cc_Token) {
      return (
        <div>
          <Router>
            <MuiThemeProvider>
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

            <MuiThemeProvider>
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

                <Route exact path="/message" component={Message}/>
              </div>
            </MuiThemeProvider>

          </Router>
        </div>

      );
    }

    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <li><Link to="/home">Home</Link></li>
            <li><Link to='/signup/start'>Signup</Link></li>
            <li><Link to='/browse'>Browse Walks</Link></li>
            <li><Link to='/walker'>Walker</Link></li>
            <li><Link to='/profilepage/owner'>Owner Profile Page</Link></li>
            <li><Link to='/profilepage/walker'>Walker Profile Page</Link></li>
            <li><Link to='/findmydog'>Find My Dog</Link></li>
            <li><Link to='/trackwalk'>Track Walk</Link></li>
            <li><Link to='/walkhistory'>Current & Past Walks</Link></li>

            <li><Link to='/message'>Message</Link></li>
            <Route exact path="/home" render={() => (
              <h1>Hello World from React</h1>
            )}/>
            <Route exact path="/signup/start" component={SignUpStart}/>
            <Route exact path="/browse" component={Browse}/>
            <Route exact path="/walker" component={Calendar}/>
            <Route exact path="/profilepage/owner" component={ProfileOwner}/>
            <Route exact path="/profilepage/walker" component={ProfileWalker}/>
            <Route exact path="/findmydog" component={FindMyDog}/>
            <Route exact path="/trackwalk" component={TrackWalk}/>
            <Route exact path="/walkhistory" component={WalkHistory}/>

            <Route exact path="/message" component={Message}/>
          </div>
        </Router>
      </MuiThemeProvider>
    );

  }
}

ReactDOM.render(<App />, document.getElementById('root'));
