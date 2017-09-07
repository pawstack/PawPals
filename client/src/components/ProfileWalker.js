import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class ProfileWalker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      walkername: '',
      phone: '',
      address: '',
      about_me: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.getWalkerProfile = this.getWalkerProfile.bind(this);
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
          phone: res[0].phone,
          address: res[0].address,
          about_me: res[0].about_me
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

  handleUpdateProfile() {
    $.ajax({
      url: '/api/profileupdate/walker',
      type: 'POST',
      data: {
        phone: this.state.phone,
        address: this.state.address,
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

    return (
      <div>

        <CardHeader
          title={this.state.walkername}
          subtitle="Walker"
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
            <tr>
              <td><CardHeader title="About me: "/></td>
              <td>
                <TextField
                  name = "about_me"
                  multiLine={true}
                  rows={2}
                  value={this.state.about_me}
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
      </div>);
  }
}


export default ProfileWalker;
