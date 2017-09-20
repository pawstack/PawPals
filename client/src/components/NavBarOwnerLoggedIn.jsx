
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
import Browse from './Browse';
import ProfileOwner from './ProfileOwner';
import FindMyDog from './FindMyDog';
import WalkHistory from './WalkHistory';
import Messages from './Messages';


class NavBarOwnerLoggedIn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem
              primaryText="Browse Walks"
              containerElement={<Link to="/browse" />}
            />
              <MenuItem
                primaryText="My Messages"
                containerElement={<Link to="/messages" />}
              />
            <MenuItem
              primaryText="My Walks"
              containerElement={<Link to='/walkhistory' />}
            />
              <MenuItem
                primaryText="My Messages"
                containerElement={<Link to="/messages" />}
              />
            <MenuItem
              primaryText="My Profile"
              containerElement={<Link to="/profilepage/owner" />}
            />
            <MenuItem
              primaryText="Find My Dog"
              containerElement={<Link to='/findmydog' />}
            />
            <MenuItem
              primaryText="Sign out"
              href = '/logout'
            />
          </IconMenu>
        </div>
      </div>
    );
  }
}



export default NavBarOwnerLoggedIn;
