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
import Message from './Message';

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
      walkCompleted: false,
      walkStarted: false,
      openchat: false
    };

    this.handleChatOpen = this.handleChatOpen.bind(this);
    this.handleChatClose = this.handleChatClose.bind(this);
  }

  handleChatOpen() {
    this.setState({openchat: true});
  }

  handleChatClose() {
    this.setState({openchat: false});
  }

  render() {
    const trackActions = [
      /*
      start walk button will be disabled:
        1) until 15 minutes before the walk
        2) if the start walk button has already been clicked
        3) if the appointment is over.

      finish walk button will be disabled:
        1) if the start walk button has not been clicked.
      */
      <FlatButton
        label="Start Walk"
        primary={true}
        icon={<GpsFixed />}
        disabled = {Date.now() < moment(this.props.selectedEvent.start).add(moment.duration({'minutes': -15}))['_d'] ||
 Date.now() > this.props.selectedEvent.end || this.state.walkStarted ? true : false}

        onClick={() => {
          this.setState({
            walkStarted: true
          });
          console.log('SELECTED WALK', this.props.selectedEvent);
          this.props.handleStartWalk(this.props.selectedEvent.id);
        }}/>,
      <FlatButton
        label="Finish Walk"
        secondary={true}
        icon={<GpsOff />}
        disabled= {!this.state.walkStarted}
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
        disabled = {(this.props.selectedEvent.owner_id !== null && Date.now() > this.props.selectedEvent.start) ? true : false}
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
        disabled = {(Date.now() > this.props.selectedEvent.end) ? true : false}
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
    console.log(this.props.selectedEvent);

    const chatActions = [
      <FlatButton
        label="Close Chat"
        primary={true}
        onClick={this.handleChatClose}
      />,
    ];

    if (!this.state.walkCompleted && Date.now() < this.props.selectedEvent.end) {
    // if (!this.state.walkCompleted) {
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
                      <li> <b>Pickup Address: </b>{this.props.selectedEvent.pickup_address}</li>
                      <li> <b>Owner: </b>{this.props.selectedEvent.owner_name} </li>
                      <li> <b>Contact: </b>{this.props.selectedEvent.owner_phone} </li>
                      <li> <b>Price: </b>${this.props.selectedEvent.price} </li>
                      <li> <b>Time: </b>{start} to {end} </li>
                      <li> <b>About the Dog: </b>{this.props.selectedEvent.dog_extras} </li>
                      <li> <b>Dog's Average Rating: </b>{this.props.selectedEvent.dog_avg_rating}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>


            <RaisedButton label="Message Owner" primary={true} onClick={this.handleChatOpen} style={{'marginLeft': '25px', 'marginTop': '15px'}}/>
            <Dialog
              title={`Chat with ${this.props.selectedEvent.owner_name}`}
              actions={chatActions}
              modal={false}
              open={this.state.openchat}
              onRequestClose={this.handleChatClose}
            >
              <Message walkerid = {this.props.selectedEvent.walker_id} ownerid = {this.props.selectedEvent.owner_id}/>
            </Dialog>


          </Dialog>
        </div>
      );
    } else if (this.state.walkCompleted || (Date.now() > this.props.selectedEvent.end)) {
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
                    <div style = {{paddingLeft: '10%'}}>
                      Please rate this walk!
                    </div>
                    <div style = {{paddingLeft: '10%'}}>
                      <StarRating
                        ratingFor = {'dog'}
                        walk = {this.props.selectedEvent}
                        ratingForID = {this.props.selectedEvent['dog_id']}
                      />
                    </div>
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

//<Message walkerid={this.props.selectedEvent.walker_id} ownerid={this.props.selectedEvent.owner_id}/>
