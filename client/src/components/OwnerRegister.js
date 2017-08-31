import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class OwnerRegister extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: null,
      breed: '',
      weight: '',
      profile_pic: '',
      extras: ''
    };
  }

  render() {
    return (
      <div>
        <div>Step 2</div>
          Dog Profile
        <div>Name <input></input></div>
        <div>Age <input></input></div>
        <div>Breed <input></input></div>
        <div>Weight <input></input></div>
        <div>Photo <img src="http://i.imgur.com/A8eQsll.jpg" width="200"></img></div>
        <div>About Dog<input type="text" size="100" width="200"></input></div>
        <button>Submit Profile</button>
      </div>
    );
  }
}

export default OwnerRegister;
