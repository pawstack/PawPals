import React from 'react';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import ReactFilestack from 'filestack-react';
import Snackbar from 'material-ui/Snackbar';
import PlacesAutocomplete from './PlacesAutocomplete';
import '../../../public/componentCSS/owner_register.css';

class OwnerRegister extends React.Component {

  constructor(props) {
    super(props);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.updateDogInfo = this.updateDogInfo.bind(this);
  }

  handleAgeChange(event, value) {
    this.props.entriesChanged('dogAge', value);
  }

  handleWeightChange(event, value) {
    this.props.entriesChanged('dogWeight', value);
  }

  uploadImage(result) {
    var url = result.filesUploaded[0].url;
    this.props.entriesChanged('dogPicURL', url);
  }

  updatePhone(e) {
    const phone = e.target.value;
    this.props.entriesChanged('phone', phone );
  }

  updateAddress(e) {
    this.props.entriesChanged( 'address', e);
  }

  updateDogInfo(event) {
    this.props.entriesChanged(event.target.name, event.target.value);
  }


  render() {
    const options = {
      accept: 'image/*',
      maxFiles: 1,
    };

    const inputProps = {
      value: this.props.address,
      onChange: (v) => { this.updateAddress(v); },
    };

    return (
      <div>
        <div>
          <Avatar
            src={this.props.userGooglePic}
            size={90}
          />
          <TextField
            disabled={true}
            id="userFullName"
            floatingLabelText="Name"
            name="userFullName"
            defaultValue ={this.props.userFullName}
            fullWidth={true}
          />
          <TextField
            disabled={true}
            id="userEmail"
            floatingLabelText="Email"
            name="userEmail"
            defaultValue ={this.props.userEmail}
            fullWidth={true}
          />

          <PlacesAutocomplete
            inputProps={inputProps}
            label={'Address'}
          />
        </div>
        <TextField
          id="phone-info"
          hintText="e.g. (949) 878-6181"
          floatingLabelText="Phone #"
          name="phone"
          onChange={this.updatePhone}
          fullWidth={true}
        />
        <TextField
          id="dog-name"
          floatingLabelText="Dog's Name"
          name="dogName"
          onChange={this.updateDogInfo}
        />
        <div>
          <TextField
            id="dog-breed"
            floatingLabelText="Dog's Breed"
            name="dogBreed"
            onChange={this.updateDogInfo}
          />
        </div>
        <div>
          <TextField
            id="dog-extra"
            hintText="e.g. Bruce loves the woods. But please don't let him chase squirrels."
            floatingLabelText="Fun facts about my dog"
            name="dogAboutMe"
            multiLine={true}
            rows={2}
            rowsMax={5}
            className="dog-info"
            onChange={this.updateDogInfo}
          />
        </div>
        <div>
          <h5>Dog's age in year: {this.props.dogAge}</h5>
          <Slider
            min={0}
            max={20}
            step={1}
            value={this.props.dogAge}
            onChange={this.handleAgeChange}
          />
        </div>
        <div>
          <h5>Dog's weight in lb: {this.props.dogWeight}</h5>
          <Slider
            min={0}
            max={200}
            step={2}
            value={this.props.dogWeight}
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
          <div className="dog-img-container">
            <img
              src={this.props.dogPicURL}
              className="dog-img"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerRegister;
