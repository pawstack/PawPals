import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
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

class WalkerRegister extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   url: '',
    //   extras: ''
    // };

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
    // this.setState({
    //   extras: e.target.value
    // });
  }

  uploadImage(result) {
    var url = result.filesUploaded[0].url;
    console.log('URL IS', url);
    this.props.entriesChanged('walkerPicURL', url);
    // this.setState({
    //   url: url
    // });
  }

  // handleSubmit() {
  //   if (checkEmptyEntry(this.state)) {
  //     console.log('phone number is', this.props.phoneInfo);
  //     alert('please complete profile');
  //   } else {
  //     console.log(this.state);
  //     $.ajax({
  //       url: '/api/signup/walker',
  //       type: 'POST',
  //       data: {
  //         profile_pic: this.state.url,
  //         extras: this.state.extras,
  //         phone: this.props.phoneInfo,
  //         address: this.props.addressInfo
  //       },
  //       success: (res) => {
  //         console.log('data sent');
  //       },
  //       error: function(data) {
  //       }
  //     });
  //   }
  //
  // }


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
        <div><br></br></div>
        <div>

          <div>
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
            buttonText="Upload Your Profile Photo"
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
