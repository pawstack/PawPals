import Dialog from 'material-ui/Dialog';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import WalkerConfirmationTextField from './walkerConfirmationTextField';

export default class DialogExampleScrollable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.handleSubmit}
      />,
    ];

    const start = moment(this.props.start, 'YYYY-MM-DD hh:mm:ss').format('llll');
    const end = moment(this.props.end, 'YYYY-MM-DD hh:mm:ss').format('LT');

    return (
      <div>
        <Dialog
          title="Confirm Walking Slot"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent={true}
        >
          <WalkerConfirmationTextField price={this.props.price} handleTextInputChange={this.props.handleTextInputChange} handleAddressSelect={this.props.handleAddressSelect} location={this.props.location} end={end} start={start} />
        </Dialog>
      </div>
    );
  }
}
