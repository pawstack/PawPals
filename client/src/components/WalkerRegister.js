import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


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
      file: '',
      imagePreviewUrl: '',
      extras: ''
    };

    this.handleExtrasChange = this.handleExtrasChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (checkEmptyEntry(this.state)) {
      console.log('phone number is', this.props.phoneInfo);
      alert('please complete profile');
    } else {
      console.log(this.state);
      $.ajax({
        url: '/api/signup/walker',
        type: 'POST',
        data: {
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
      imagePreview = (<img src={imagePreviewUrl} width="200"/>);
    } else {
      imagePreview = (<div>Please select an Image for Preview</div>);
    }

    return (
      <div>
        <h4>Step 2 Complete profile as a walker</h4>
        <div><br></br></div>
        <div><h5>Upload your profile photo</h5></div>
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
