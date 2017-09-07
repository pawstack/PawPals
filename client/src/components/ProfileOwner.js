import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class ProfileOwner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ownername: '',
      phone: '',
      address: '',
      dogphoto: '',
      id: 0,
      name: '',
      age: '',
      breed: '',
      weight: 0,
      extras: ''
    };

    this.getOwnerProfile = this.getOwnerProfile.bind(this);
    this.getDogProfile = this.getDogProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }


  getOwnerProfile() {
    $.ajax({
      url: '/api/profile/owner',
      type: 'GET',
      success: (res) => {
        console.log('OWNER PROFILE', res[0]);
        this.setState({
          ownername: res[0].display,
          phone: res[0].phone,
          address: res[0].address
        });
      },
      error: function(err) {
      }
    });
  }


  getDogProfile() {
    $.ajax({
      url: '/api/profile/dog',
      type: 'GET',
      success: (res) => {
        console.log('DOG PROFILE ', res[0]);
        this.setState({
          id: res[0].id,
          name: res[0].name,
          breed: res[0].breed,
          weight: res[0].weight,
          extras: res[0].extras,
        });
      },
      error: function(err) {
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
        extras: this.state.extras,
        phone: this.state.phone,
        address: this.state.address
      },
      success: (res) => {
        console.log('data sent');
      },
      error: function(data) {
      }
    });
  }

  render() {

    return (
      <div>
        <CardHeader
          title={this.state.ownername}
          subtitle="Owner"
          avatar='https://s.imgur.com/images/404/cat3weyes.png'
        />
        <table>
          <tbody>
            <tr>
              <td><CardHeader title="Phone: "/></td>
              <td>
                <TextField
                  name = "phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><CardHeader title="Address: "/></td>
              <td>
                <TextField
                  name = "address"
                  multiLine={true}
                  rows={2}
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Japaneseakita.jpg/200px-Japaneseakita.jpg" alt="" width="220" style={{'borderRadius': '10px', 'marginLeft': '20px', 'marginTop': '30px'}}/>
        </div>

        <div style={{'float': 'right', 'marginRight': '320px', 'marginTop': '-210px'}}>
          <table>
            <tbody>
              <tr>
                <td><CardHeader title="Dog's Name:"/></td>
                <td>
                  <TextField
                    name = "name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td><CardHeader title="Dog's Breed:"/></td>
                <td>
                  <TextField
                    name = "breed"
                    value={this.state.breed}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td><CardHeader title="Dog's Weight in LB:"/></td>
                <td>
                  <TextField
                    name = "weight"
                    value={this.state.weight}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td><CardHeader title="Dog's Info:"/></td>
                <td>
                  <TextField
                    name = "extras"
                    value={this.state.extras}
                    onChange={this.handleChange}
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
//onClick={this.getDogProfile}