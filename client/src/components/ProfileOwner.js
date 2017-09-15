import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactFilestack from 'filestack-react';
import PlacesAutocomplete from './PlacesAutocomplete';

class ProfileOwner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ownername: '',
      phone: '',
      phone_old: '',
      address: '',
      address_old: '',
      dogphoto: '',
      id: 0,
      name: '',
      name_old: '',
      age: '',
      age_old: '',
      breed: '',
      breed_old: '',
      weight: 0,
      weight_old: 0,
      url: '',
      extras: '',
      extras_old: ''
    };

    this.getOwnerProfile = this.getOwnerProfile.bind(this);
    this.getDogProfile = this.getDogProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }


  getOwnerProfile() {
    $.ajax({
      url: '/api/profile/owner',
      type: 'GET',
      success: (res) => {
        this.setState({
          ownername: res[0].display,
          phone: res[0].phone,
          phone_old: res[0].phone,
          address: res[0].address,
          address_old: res[0].address
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  getDogProfile() {
    $.ajax({
      url: '/api/profile/dog',
      type: 'GET',
      success: (res) => {
        this.setState({
          id: res[0].id,
          name: res[0].name,
          name_old: res[0].name,
          breed: res[0].breed,
          breed_old: res[0].breed,
          age: res[0].age,
          age_old: res[0].age,
          weight: res[0].weight,
          weight_old: res[0].weight,
          url: res[0].profile_pic,
          extras: res[0].extras,
          extras_old: res[0].extras,
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  componentDidMount() {
    this.getOwnerProfile();
    this.getDogProfile();
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
      url: '/api/profileupdate/owner',
      type: 'POST',
      data: {
        name: this.state.name,
        age: this.state.age,
        id: this.state.id,
        breed: this.state.breed,
        weight: this.state.weight,
        profile_pic: this.state.url,
        extras: this.state.extras,
        phone: this.state.phone,
        address: this.state.address
      },
      success: (res) => {
      },
      error: (err) => {
        console.error(err);
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
      onChange: (v) => { this.setState({'address': v}); }
    };

    return (
      <div>
        <CardHeader
          title={this.state.ownername}
          subtitle="Owner"
          avatar='https://s.imgur.com/images/404/cat3weyes.png'
        />
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
          </tbody>
        </table>
        <div>
          <img src={this.state.url} alt="" width="220" height="220" style={{'borderRadius': '10px', 'marginLeft': '20px', 'marginTop': '20px', 'marginBottom': '20px'}}/>
        </div>
        <div style={{'marginLeft': '20px'}}>
          <ReactFilestack
            apikey="Ay45M83ltRnWSZq3qL6Zhz"
            buttonText="Change Dog's Photo"
            buttonClass="photoupload"
            options={options}
            onSuccess={this.uploadImage}
          />
        </div>
        <div style={{'float': 'right', 'marginRight': '320px', 'marginTop': '-260px'}}>
          <table>
            <tbody>
              <tr>
                <td><CardHeader title="Dog's Name:"/></td>
                <td>
                  <TextField
                    name = "name"
                    onChange={this.handleChange}
                    hintText={this.state.name_old}
                  />
                </td>
              </tr>
              <tr>
                <td><CardHeader title="Dog's Breed:"/></td>
                <td>
                  <TextField
                    name = "breed"
                    hintText={this.state.breed_old}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td><CardHeader title="Dog's Age:"/></td>
                <td>
                  <TextField
                    name = "age"
                    hintText={this.state.age_old}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td><CardHeader title="Dog's Weight in lb:"/></td>
                <td>
                  <TextField
                    name = "weight"
                    hintText={this.state.weight_old}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td><CardHeader title="Dog's Info:"/></td>
                <td>
                  <TextField
                    name = "extras"
                    hintText={this.state.extras_old}
                    onChange={this.handleChange}
                    multiLine={true}
                    rows={1}
                    rowsMax={8}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <br></br>
          <br></br>
        </div>
        <div style={{'marginLeft': '20px'}}>
          <RaisedButton label="Update Profile" onClick={this.handleUpdateProfile}/>
        </div>
      </div>);
  }
}


export default ProfileOwner;
