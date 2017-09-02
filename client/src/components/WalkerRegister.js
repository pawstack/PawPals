import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import $ from 'jquery';

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
      console.log(this.state);
      alert('please complete profile');
    } else {
      console.log(this.state);
      $.ajax({
        url: '/api/signup/walker',
        type: 'POST',
        data: {
          profile_pic: this.state.imagePreviewUrl,
          extras: this.state.extra
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
        <div>Step 2</div>
          Walker Profile
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
        <div>About me  <input
          type="textbox"
          size="100"
          width="100"
          onChange = {this.handleExtrasChange}>
        </input></div>
        <button onClick = {this.handleSubmit}>Submit Profile</button>
      </div>
    );
  }
}

export default WalkerRegister;
