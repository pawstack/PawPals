import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';


var checkEmptyEntry = function(obj) {
  for (let key in obj) {
    if (obj[key] === '' || obj[key] === null) {
      return true;
    }
  }
  return false;
};

class OwnerRegister extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      name: '',
      age: 0,
      breed: '',
      file: '',
      weight: 0,
      imagePreviewUrl: '',
      extras: '',
      owner: true
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleBreedChange = this.handleBreedChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleExtrasChange = this.handleExtrasChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleAgeChange(e, value) {
    this.setState({
      age: value
    });
  }

  handleBreedChange(e) {
    this.setState({
      breed: e.target.value
    });
  }

  handleWeightChange(e, value) {
    this.setState({
      weight: value
    });
  }

  handleExtrasChange(e) {
    this.setState({
      extras: e.target.value
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


  handleSubmit() {
    console.log('phone is', this.props.phoneInfo);
    if (checkEmptyEntry(this.state)) {
      console.log(this.state);
      alert('please complete profile');
    } else {
      console.log(this.state);
      $.ajax({
        url: '/api/signup/owner',
        type: 'POST',
        data: {
          name: this.state.name,
          age: this.state.age,
          breed: this.state.breed,
          weight: this.state.weight,
          profile_pic: this.state.imagePreviewUrl,
          extras: this.state.extras,
          phone: this.props.phoneInfo,
          address: this.props.addressInfo
        },
        success: (res) => {
          console.log('data sent');
        },
        error: function(data) {
        }
      });
    }
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      //console.log('URL is', imagePreviewUrl);
      imagePreview = (<img src={imagePreviewUrl} width="200"/>);
    } else {
      imagePreview = (<div>Please select an Image for Preview</div>);
    }

    return (
      <div>
        <TextField
          id="dog-name"
          floatingLabelText="Dog's Name"
          name="dogName"
          onChange={this.handleNameChange}
        />
        <div>
          <TextField
            id="dog-breed"
            floatingLabelText="Dog's Breed"
            name="dogBreed"
            onChange={this.handleBreedChange}
          />
        </div>
        <div>
          <h5>Dog's age in year: {this.state.age}</h5>
          <Slider
            min={0}
            max={20}
            step={0.5}
            value={this.state.age}
            onChange={this.handleAgeChange}
          />
        </div>
        <div>
          <h5>Dog's weight in lb: {this.state.weight}</h5>
          <Slider
            min={0}
            max={200}
            step={2}
            value={this.state.weight}
            onChange={this.handleWeightChange}
          />
        </div>
        <h5>Upload a photo of your dog</h5>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={(e)=>this.handleImageChange(e)} />
        </form>
        <div>
          {imagePreview}
        </div>

        <div>
          <TextField
            id="dog-extra"
            hintText="e.g. Bruce loves the woods. But please don't let him chase squirrels."
            floatingLabelText="About dog"
            name="dogExtras"
            multiLine={true}
            rows={2}
            rowsMax={5}
            style={{
              width: '400px'
            }}
            onChange={this.handleExtrasChange}
          />
        </div>

        <RaisedButton label="Submit Profile" primary={true} onClick={this.handleSubmit} />

      </div>
    );
  }
}

export default OwnerRegister;
