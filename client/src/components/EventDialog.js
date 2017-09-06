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
        <RaisedButton label="Dialog" onClick={this.props.handleOpen} />
        <Dialog
          title="Walk Details"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
          <ul>
            <li> Area: {this.props.selectedEvent.neighbourhood}</li>
            <li> Attendees: Currently not a feature </li>
            <li> Price: ${this.props.selectedEvent.price} </li>
            <li> Time: {start} to {end} </li>
          </ul>
        </Dialog>
      </div>
    );
  }
}
