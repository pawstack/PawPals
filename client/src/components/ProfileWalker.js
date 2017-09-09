import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactFilestack from 'filestack-react';
import PlacesAutocomplete from './PlacesAutocomplete';

class ProfileWalker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      walkername: '',
      phone: '',
      phone_old: '',
      address: '',
      url: '',
      address_old: '',
      about_me: '',
      about_me_old: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.getWalkerProfile = this.getWalkerProfile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }

  getWalkerProfile() {
    $.ajax({
      url: '/api/profile/walker',
      type: 'GET',
      success: (res) => {
        console.log('WALKER PROFILE', res[0]);
        this.setState({
          walkername: res[0].display,
          url: res[0].profile_pic,
          phone: res[0].phone,
          phone_old: res[0].phone,
          address: res[0].address,
          address_old: res[0].address,
          about_me: res[0].about_me,
          about_me_old: res[0].about_me
        });
      },
      error: function(err) {
      }
    });
  }


  componentDidMount() {
    this.getWalkerProfile();
  }

  handleChange (event, value) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
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

  handleUpdateProfile() {
    $.ajax({
      url: '/api/profileupdate/walker',
      type: 'POST',
      data: {
        phone: this.state.phone,
        address: this.state.address,
        profile_pic: this.state.url,
        about_me: this.state.about_me
      },
      success: (res) => {
        console.log('data sent');
      },
      error: function(data) {
      }
    });
  }

  render() {
    const options = {
      accept: 'image/*',
      maxFiles: 1,
    };

    const inputProps = {
      value: this.state.address,
      onChange: (v) => { this.setState({'address': v}); },
    };

    return (
      <div>
        <CardHeader
          title={this.state.walkername}
          subtitle="Walker"
          avatar='https://s.imgur.com/images/404/cat3weyes.png'
        />
        <div>
          <img src={this.state.url} alt="" width="220" style={{'borderRadius': '10px', 'marginLeft': '20px', 'marginTop': '20px', 'marginBottom': '10px'}}/>
        </div>
        <div style={{'borderRadius': '10px', 'marginLeft': '20px', 'marginTop': '10px', 'marginBottom': '20px'}}>
          <ReactFilestack
            apikey="Ay45M83ltRnWSZq3qL6Zhz"
            buttonText="Change Your Profile Photo"
            buttonClass="photoupload"
            options={options}
            onSuccess={this.uploadImage}
          />
        </div>
        <div>
          <table style={{'width': '100%'}}>
            <tbody>
              <tr>
                <td><CardHeader title="Phone: "/></td>
                <td>
                  <TextField
                    name = "phone"
                    hintText={this.state.phone_old}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td><CardHeader title="Address: "/></td>
                <td>
                  <PlacesAutocomplete inputProps={inputProps} hintText={this.state.address_old} />
                </td>
              </tr>
              <tr>
                <td><CardHeader title="About me: "/></td>
                <td>
                  <TextField
                    name = "about_me"
                    multiLine={true}
                    rows={2}
                    hintText={this.state.about_me_old}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <br></br>
            <br></br>
          </div>
          <div style={{'marginLeft': '20px'}}>
            <RaisedButton label="Update Profile" onClick={this.handleUpdateProfile}/>
          </div>
        </div>
      </div>);
  }
}


export default ProfileWalker;
