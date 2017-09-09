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

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ProfileWalker from './ProfileWalker';
import Calendar from './Calendar';
injectTapEventPlugin();

class NavBarWalkerLoggedIn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem
                primaryText="My Profile"
                onTouchTap = {() => console.log('touch1') }
                containerElement={<Link to="/profilepage/walker" />}
              />
              <MenuItem
                primaryText="View My Calendar"
                onTouchTap = {() => console.log('touch2') }
                containerElement={<Link to="/walker" />}
              />
              <MenuItem
                primaryText="Sign out"
                containerElement={<Link to="/logout" />}
              />
            </IconMenu>

            <Route exact path="/profilepage/walker" component={ProfileWalker}/>
            <Route exact path="/walker" component={Calendar}/>

          </div>


        </Router>
      </div>
    );
  }
}



export default NavBarWalkerLoggedIn;
