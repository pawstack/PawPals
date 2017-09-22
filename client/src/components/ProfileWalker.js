import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactFilestack from 'filestack-react';
import PlacesAutocomplete from './PlacesAutocomplete';
import '../../../public/componentCSS/profile_walker.css';

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
    var url = result.filesUploaded[0].url;
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
          subtitle="Dog Walker"
          avatar={this.state.url}
          titleStyle={{'fontSize': '20px', 'fontFamily': '"Pontano Sans"', 'fontWeight':'bold'}}
          subtitleStyle={{'fontSize': '16px', 'fontFamily': '"Pontano Sans"'}}
        />
        <div>
          <img src={this.state.url} alt="" className="walker-photo-img"/>
        </div>
        <div
          className="walker-photo-upload"
        >
          <ReactFilestack
            apikey="Ay45M83ltRnWSZq3qL6Zhz"
            buttonText="Change Photo"
            buttonClass="photoupload"
            options={options}
            onSuccess={this.uploadImage}
          />
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <CardHeader
                    title="Phone: "
                    titleStyle={{'fontSize': '18px', 'fontFamily': '"Pontano Sans"'}}
                  />
                </td>
                <td>
                  <TextField
                    name = "phone"
                    hintText={this.state.phone_old}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <CardHeader
                    title="Address: "
                    titleStyle={{'fontSize': '18px', 'fontFamily': '"Pontano Sans"'}}
                  />
                </td>
                <td>
                  <PlacesAutocomplete inputProps={inputProps} hintText={this.state.address_old} />
                </td>
              </tr>
              <tr>
                <td className="walker-info-td">
                  <CardHeader
                    title="About me: "
                    titleStyle={{'fontSize': '18px', 'fontFamily': '"Pontano Sans"'}}
                  />
                </td>
                <td className="walker-info-td">
                  <TextField
                    name = "about_me"
                    multiLine={true}
                    style={{width:"500px"}}
                    rows={1}
                    rowsMax={8}
                    hintText={this.state.about_me_old}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button className="update-btn" onClick={this.handleUpdateProfile}>
                    Update Profile
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>);
  }
}


export default ProfileWalker;
