import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class WalkerRegister extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imagefile: '',
      imagePreviewUrl: '',
      profile_pic: 'http://i.imgur.com/tm9TMPU.jpg',
      extras: ''
    };

    this.handleExtraChange = this.handleExtraChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handlePicChange(e) {
  //   this.setState({
  //     profile_pic: e.target.src
  //   });
  // }

  handleExtraChange(e) {
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
    console.log(this.state.extras);
    console.log(this.state.file);
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
          onChange = {this.handleExtraChange}>
        </input></div>
        <button onClick = {this.handleSubmit}>Submit Profile</button>
      </div>
    );
  }
}

export default WalkerRegister;
