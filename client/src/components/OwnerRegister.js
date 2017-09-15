import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import ReactFilestack from 'filestack-react';
import Snackbar from 'material-ui/Snackbar';
import PlacesAutocomplete from './PlacesAutocomplete';


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
      weight: 0,
      url: '',
      extras: '',
      owner: true,
      open: false
    };

    this.updatePhone = this.updatePhone.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleBreedChange = this.handleBreedChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleExtrasChange = this.handleExtrasChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
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

  uploadImage(result) {
    console.log('RESULT IS ', result);
    var url = result.filesUploaded[0].url;
    console.log('URL IS', url);
    this.setState({
      url: url
    });
  }

  updatePhone(e) {
    const phone = e.target.value;
    this.props.entriesChanged('phone', phone );
  }

  updateAddress(e) {
    this.props.entriesChanged( 'address', e);
  }


  handleSubmit() {
    console.log('phone is', this.props.phoneInfo);
    if (checkEmptyEntry(this.state)) {
      alert('please complete profile');
    } else {
      $.ajax({
        url: '/api/signup/owner',
        type: 'POST',
        data: {
          name: this.state.name,
          age: this.state.age,
          breed: this.state.breed,
          weight: this.state.weight,
          profile_pic: this.state.url,
          extras: this.state.extras,
          phone: this.props.phoneInfo,
          address: this.props.addressInfo
        },
        context: this,
        success: (res) => {
          this.handleTouchTap();
        },
        error: function(data) {
        }
      });
    }
  }

  render() {

    const options = {
      accept: 'image/*',
      maxFiles: 1,
    };

    const inputProps = {
      value: this.props.addressInfo,
      onChange: (v) => { this.updateAddress(v); },
    };


    return (
      <div>
        <TextField
          id="phone-info"
          hintText="e.g. 9498786181"
          floatingLabelText="Phone #"
          name="phone"
          onChange={this.updatePhone}
          fullWidth={true}
        />
        <div>
          <PlacesAutocomplete
            inputProps={inputProps}
            label={'Address'}
          />
        </div>

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
            step={1}
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

        <div>
          <ReactFilestack
            apikey="Ay45M83ltRnWSZq3qL6Zhz"
            buttonText="Upload Dog's Photo"
            buttonClass="photoupload"
            options={options}
            onSuccess={this.uploadImage}
          />
          <div style={{'marginTop': '20px'}}>
            <img src={this.state.url} width="200"></img>
          </div>
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
        <Snackbar
          open={this.state.open}
          message="Profile has been submitted!"
          autoHideDuration={900}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default OwnerRegister;
