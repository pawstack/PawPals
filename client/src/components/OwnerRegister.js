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

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleAgeChange(e) {
    this.setState({
      age: e.target.value
    });
  }

  handleBreedChange(e) {
    this.setState({
      breed: e.target.value
    });
  }

  handleWeightChange(e) {
    this.setState({
      weight: e.target.value
    });
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
          Dog Profile
        <div handleChange = {this.handleNameChange}>Name <input></input></div>
        <div handleChange = {this.handleAgeChange}>Age <input></input></div>
        <div handleChange = {this.handleBreedChange}>Breed <input></input></div>
        <div handleChange = {this.handleWeightChange}>Weight <input></input></div>
        <div>Photo <img
          src="http://i.imgur.com/A8eQsll.jpg"
          width="200"
          handleChange = {this.handlePicChange}>
        </img></div>
        <div>About Dog<input
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

export default OwnerRegister;
