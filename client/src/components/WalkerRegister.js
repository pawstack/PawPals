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
      profile_pic: "http://i.imgur.com/tm9TMPU.jpg",
      extras: ''
    };

    this.handleExtraChange = this.handleExtraChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handlePicChange(e) {
  //   this.setState({
  //     profile_pic: e.target.src
  //   });
  // }

  handleExtraChange(e) {
    this.setState({
      extras: e.target.value
    });
  }

  handleSubmit(){
    console.log(this.state.extras)
    console.log(this.state.profile_pic)
  }

  render() {
    return (
      <div>
        <div>Step 2</div>
          Walker Profile
        <div>Photo <img src="http://i.imgur.com/tm9TMPU.jpg"
          width="200">
        </img></div>
        <div>About me  <input
          type="textbox"
          size="100"
          width="100"
          onChange = {this.handleExtraChange}>
        </input></div>
        <button onClick = {this.handleSubmit}>Submit Profile</button>
      </div>
    );
  }
}

export default WalkerRegister;
