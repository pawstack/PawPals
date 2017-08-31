import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class WalkerRegister extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile_pic: '',
      extras: ''
    };
  }

  render() {
    return (
      <div>
        <div>Step 2</div>
          Walker Profile
        <div>Photo  <img src="http://i.imgur.com/tm9TMPU.jpg" width="200"></img></div>
        <div>About me  <input type="text" size="100" width="200"></input></div>
        <button>Submit Profile</button>
      </div>
    );
  }
}

export default WalkerRegister;
