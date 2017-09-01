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

  handlePicChange(e) {
    this.setState({
      profile_pic: e.target.src
    });
  }

  handleExtraChange(e) {
    this.setState({
      extra: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div>Step 2</div>
          Walker Profile
        <div>Photo <img src="http://i.imgur.com/tm9TMPU.jpg"
          width="200"
          handleChange = {this.handlePicChange}>
        </img></div>
        <div>About me  <input
          type="textbox"
          size="100"
          width="100"
          handleChange = {this.handleExtraChange}>
        </input></div>
        <button>Submit Profile</button>
      </div>
    );
  }
}

export default WalkerRegister;
