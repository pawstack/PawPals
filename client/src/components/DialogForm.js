import Dialog from 'material-ui/Dialog';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment'

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
}

const WalkerConfirmationTextField = (props) => (
  <div>
    <text>{props.start} to {props.end}</text>
    <br />
    <TextField
      floatingLabelText="Walking Zone"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      id="text-field-default"
      value= {props.location}
      onChange={(e, v) => props.handleTextInputChange('location', v)}
    /><br />
    <TextField
      floatingLabelText="Price per Hour"
      type="number"
      min="20"
      step="1.00"
      max="100"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      onChange={(e, v) =>
        {props.handleTextInputChange('price', v)}}
    />
  </div>
);

export default class DialogExampleScrollable extends React.Component {
  constructor(props) {
    super(props);
  }

    render() {
      console.log(this.props.price, 'price')
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

    const start = moment(this.props.start, 'YYYY-YY-DD hh:mm:ss').format('llll');
    const end = moment(this.props.end, 'YYYY-YY-DD hh:mm:ss').format('LT');

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
        <WalkerConfirmationTextField price={this.props.price} handleTextInputChange={this.props.handleTextInputChange} location={this.props.location} end={end} start={start} />
        </Dialog>
      </div>
    );
  }
}
