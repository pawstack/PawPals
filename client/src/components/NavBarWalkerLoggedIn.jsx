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

class NavBarWalkerLoggedIn extends React.Component {
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
              primaryText="My Calendar"
              containerElement={<Link to="/walker" />}
            />
            <MenuItem
              primaryText="My Messages"
              containerElement={<Link to="/messages" />}
            />
            <MenuItem
              primaryText="My Profile"
              containerElement={<Link to="/profilepage/walker" />}
            />
            <MenuItem
              primaryText="Sign Out"
              href ='/logout'
            />
          </IconMenu>
        </div>
      </div>
    );
  }
}



export default NavBarWalkerLoggedIn;
