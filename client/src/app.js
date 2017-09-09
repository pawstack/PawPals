import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SignUpStart from './components/SignUpStart';
import Browse from './components/Browse';
import Calendar from './components/Calendar';
import Payment from './components/Payment.jsx';
import ProfileOwner from './components/ProfileOwner';
import ProfileWalker from './components/ProfileWalker';
import Confirmation from './components/Confirmation.jsx';


class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to='/signup/start'>Signup</Link></li>
              <li><Link to='/browse'>Browse Walks</Link></li>
              <li><Link to='/walker'>Walker</Link></li>
              <li><Link to='/profilepage/owner'>Owner Profile Page</Link></li>
              <li><Link to='/profilepage/walker'>Walker Profile Page</Link></li>
<<<<<<< HEAD

>>>>>>> updates for confirmation
            </ul>

            <Route exact path="/home" render={() => (
              <h1>Hello World from React</h1>
            )}/>
            <Route exact path="/signup/start" component={SignUpStart}/>
            <Route exact path="/browse" component={Browse}/>
            <Route exact path="/walker" component={Calendar}/>
            <Route exact path="/profilepage/owner" component={ProfileOwner}/>
            <Route exact path="/profilepage/walker" component={ProfileWalker}/>
<<<<<<< HEAD

>>>>>>> updates for confirmation
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
