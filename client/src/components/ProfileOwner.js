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
      dogname: '',
      dogage: '',
      dogbreed: '',
      dogweight: '',
      dogextras: ''
    };

    this.getOwnerProfile = this.getOwnerProfile.bind(this);
    this.getDogProfile = this.getDogProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
          dogname: res[0].name,
          dogbreed: res[0].breed,
          dogweight: res[0].weight,
          dogextras: res[0].extras,
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

  render() {

    return (
      <div>
        <CardHeader
          title={this.state.ownername}
          subtitle="Owner"
          avatar='https://s.imgur.com/images/404/cat3weyes.png'
        />
        <CardHeader title="Phone: "/>
        <TextField
          name = "phone"
          value={this.state.phone}
          onChange={this.handleChange}
        />
        <CardHeader title="Address: "/>
        <TextField
          name = "address"
          multiLine={true}
          rows={2}
          value={this.state.address}
          onChange={this.handleChange}
        />
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Japaneseakita.jpg/200px-Japaneseakita.jpg" alt="" width="250" style={{'borderRadius': '10px', 'marginLeft': '20px', 'marginTop': '30px'}}/>
        </div>

        <div style={{'float': 'right', 'marginRight': '480px', 'marginTop': '-250px'}}>

          <CardHeader title="Dog's Name: "/>
          <TextField
            name = "dogname"
            value={this.state.dogname}
            onChange={this.handleChange}
          />
          <CardHeader title="Dog's Breed: "/>
          <TextField
            name = "dogbreed"
            value={this.state.dogbreed}
            onChange={this.handleChange}
          />
          <CardHeader title="Dog's Weight in LB: "/>
          <TextField
            name = "dogweight"
            value={this.state.dogweight}
            onChange={this.handleChange}
          />
          <CardHeader title="Dog's Info: "/>
          <TextField
            name = "dogextras"
            value={this.state.dogextras}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <br></br>
          <br></br>
        </div>
        <div style={{'marginLeft': '20px'}}>
          <RaisedButton label="Update Profile" />
        </div>
      </div>);
  }
}


export default ProfileOwner;
//onClick={this.getDogProfile}