import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import ReactFilestack from 'filestack-react';
import Snackbar from 'material-ui/Snackbar';
import PlacesAutocomplete from './PlacesAutocomplete';

class WalkerRegister extends React.Component {

  constructor(props) {
    super(props);
    this.updateWalkerInfo = this.updateWalkerInfo.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
  }

  updatePhone(e) {
    const phone = e.target.value;
    this.props.entriesChanged('phone', phone );
  }

  updateAddress(e) {
    this.props.entriesChanged( 'address', e);
  }

  updateWalkerInfo(event) {
    this.props.entriesChanged(event.target.name, event.target.value);
  }

  uploadImage(result) {
    var url = result.filesUploaded[0].url;
    if (url !== '') {
      this.props.entriesChanged('userGooglePic', url);
    }
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

          <div>
            <TextField
              id="walker-extra"
              hintText="e.g. I grew up with 5 dogs and have had more than 20 years' experience with puppies, adult and elderly dogs."
              floatingLabelText="About me"
              name="walkerAboutMe"
              multiLine={true}
              rows={2}
              rowsMax={5}
              style={{
                width: '400px'
              }}
              onChange={this.updateWalkerInfo}
            />
          </div>

          <ReactFilestack
            apikey="Ay45M83ltRnWSZq3qL6Zhz"
            buttonText="Change my profile photo"
            buttonClass="photoupload"
            options={options}
            onSuccess={this.uploadImage}
          />
          <div style={{'marginTop': '20px'}}>
            <img
              src={this.props.walkerPicURL}
              width="200"
              style = {{'borderRadius': '40px'}}
            >
            </img>
          </div>
        </div>
      </div>
    );
  }
}

export default WalkerRegister;
