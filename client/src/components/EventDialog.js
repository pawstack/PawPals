import Dialog from 'material-ui/Dialog';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';

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
  }

  render() {
    const actions = [
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
    ];
    const start = moment(this.props.selectedEvent.start, 'YYYY-YY-DD hh:mm:ss').format('llll');
    const end = moment(this.props.selectedEvent.end, 'YYYY-YY-DD hh:mm:ss').format('LT');
    return (
      <div>
        <Dialog
          title= {this.props.selectedEvent.title}
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
          <ul>
            <li> Pickup Address: {this.props.selectedEvent.pickup_address}</li>
            <li> Owner: {this.props.selectedEvent.owner_name} </li>
            <li> Contact: {this.props.selectedEvent.owner_phone} </li>
            <li> Price: ${this.props.selectedEvent.price} </li>
            <li> Time: {start} to {end} </li>
            <li> About the Dog: {this.props.selectedEvent.dog_extras} </li>
          </ul>
        </Dialog>
      </div>
    );
  }
}
