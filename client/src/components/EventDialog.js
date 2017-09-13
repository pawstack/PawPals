import Dialog from 'material-ui/Dialog';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';
import GpsFixed from 'material-ui/svg-icons/device/gps-fixed';
import GpsOff from 'material-ui/svg-icons/device/gps-off';
import StarRating from './StarRating.jsx';

const styles = {
  radioButton: {
    marginTop: 16,
    errorStyle: {
      color: orange500,
    },
    underlineStyle: {
      borderColor: orange500,
    },
    floatingLabelStyle: {
      color: orange500,
    },
    floatingLabelFocusStyle: {
      color: blue500,
    },
  }
};

export default class EventDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walkCompleted: false
    };
  }

  render() {
    console.log('the selected walk is ', this.props.selectedEvent);
    const trackActions = [
      <FlatButton
        label="Start Walk"
        primary={true}
        icon={<GpsFixed />}
        onClick={() => {
          this.props.handleStartWalk(this.props.selectedEvent.id);
        }}/>,
      <FlatButton
        label="Finish Walk"
        secondary={true}
        icon={<GpsOff />}
        onClick={() => {
          this.props.handleFinishWalk();
          this.setState({
            walkCompleted: true
          });
        }}/>
    ];
    const actions = trackActions.concat([
      <FlatButton
        label="Cancel Walk"
        primary={false}
        onClick={this.props.handleCancel}
      />,
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.handleClose}
      />,
    ]);

    const ratingConfirmationButtons = [
      <FlatButton
        label="Resume Tracking This Walk"
        primary={true}
        icon={<GpsFixed />}
        onClick={() => {
          this.props.handleStartWalk(this.props.selectedEvent.id);
          this.setState({
            walkCompleted: false
          });
        }}/>,
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.handleClose}
      />,
    ];
    const start = moment(this.props.selectedEvent.start, 'YYYY-MM-DD hh:mm:ss').format('llll');
    const end = moment(this.props.selectedEvent.end, 'YYYY-MM-DD hh:mm:ss').format('LT');
    if (!this.state.walkCompleted) {
      return (
        <div>
          <Dialog
            title= {this.props.selectedEvent.title}
            actions={actions}
            modal={false}
            open={this.props.open}
            onRequestClose={this.props.handleClose}
          >
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={this.props.selectedEvent.dog_profile_pic} alt="" width="220" height="220" style={{'borderRadius': '10px'}}/>
                  </td>
                  <td>
                    <ul>
                      <li> Pickup Address: {this.props.selectedEvent.pickup_address}</li>
                      <li> Owner: {this.props.selectedEvent.owner_name} </li>
                      <li> Contact: {this.props.selectedEvent.owner_phone} </li>
                      <li> Price: ${this.props.selectedEvent.price} </li>
                      <li> Time: {start} to {end} </li>
                      <li> About the Dog: {this.props.selectedEvent.dog_extras} </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </Dialog>
        </div>
      );
    } else if (this.state.walkCompleted) {
      return (
        <div>
          <Dialog
            title= {this.props.selectedEvent.title}
            actions={ratingConfirmationButtons}
            modal={false}
            open={this.props.open}
            onRequestClose={this.props.handleClose}
          >
            <table>
              <tbody>
                <tr>
                  <td>
                    <img
                      src={this.props.selectedEvent.dog_profile_pic}
                      alt=""
                      width="220"
                      height="220"
                      style={{'borderRadius': '10px'}}/>
                  </td>
                  <td>
                    Please rate this walk!
                    <StarRating
                      ratingFor = {'dog'}
                      walk = {this.props.selectedEvent}
                      ratingForID = {this.props.selectedEvent['dog_id']}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Dialog>
        </div>
      );
    }

  }
}


//ratingForID = {this.props.selectedEvent['walker_id']}
