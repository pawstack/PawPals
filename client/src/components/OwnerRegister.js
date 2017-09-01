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
      file: '',
      imagePreviewUrl: '',
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

  handleExtrasChange(e) {
    this.setState({
      extra: e.target.value
    });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} width="200"/>);
    } else {
      imagePreview = (<div>Please select an Image for Preview</div>);
    }

    return (
      <div>
        <div>Step 2</div>
          Dog Profile
        <div handleChange = {this.handleNameChange}>Name <input></input></div>
        <div handleChange = {this.handleAgeChange}>Age <input></input></div>
        <div handleChange = {this.handleBreedChange}>Breed <input></input></div>
        <div handleChange = {this.handleWeightChange}>Weight <input></input></div>
        <div>
          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input
              className="fileInput"
              type="file"
              onChange={(e)=>this.handleImageChange(e)} />
          </form>
          <div>
            {imagePreview}
          </div>
        </div>
        <div>About Dog<input
          type="textbox"
          size="100"
          width="100"
          handleChange = {this.handleExtrasChange}>
        </input></div>
        <button>Submit Profile</button>
      </div>
    );
  }
}

export default OwnerRegister;
