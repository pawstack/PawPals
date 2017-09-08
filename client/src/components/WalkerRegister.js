import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactFilestack from 'filestack-react';


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
    this.state = {
      url: '',
      extras: ''
    };

    this.handleExtrasChange = this.handleExtrasChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    if (checkEmptyEntry(this.state)) {
      console.log('phone number is', this.props.phoneInfo);
      alert('please complete profile');
    } else {
      console.log(this.state);
      $.ajax({
        url: '/api/signup/walker',
        type: 'POST',
        data: {
          profile_pic: this.state.url,
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

    const options = {
      accept: 'image/*',
      maxFiles: 1,
    };

    return (
      <div>
        <h4>Step 2 Complete profile as a walker</h4>
        <div><br></br></div>
        <div>
          <ReactFilestack
            apikey="Ay45M83ltRnWSZq3qL6Zhz"
            buttonText="Upload Your Profile Photo"
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
            id="walker-extra"
            hintText="e.g. I grew up with 5 dogs and have had more than 20 years' experience with puppies, adult and elderly dogs."
            floatingLabelText="About me"
            name="walkerExtras"
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

export default WalkerRegister;
