import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReactFilestack from 'filestack-react';
import RaisedButton from 'material-ui/RaisedButton';


class FileStack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };

    this.upload = this.upload.bind(this);

  }

  upload(result) {
    console.log('RESULT IS ', result);
    console.log('URL IS', result.filesUploaded[0].url);
    var url = result.filesUploaded[0].url;
    this.setState({
      url: url
    });
  }


  render() {
    const options = {
      accept: 'image/*',
      maxFiles: 1,
    };

    return (
      <div>
        <ReactFilestack
          apikey="Ay45M83ltRnWSZq3qL6Zhz"
          buttonText="Upload Profile Photo"
          buttonClass="photoupload"
          options={options}
          onSuccess={this.upload}
        />
        <div>
          <img src={this.state.url} width="200"></img>
        </div>
      </div>
    );
  }

}

export default FileStack;

