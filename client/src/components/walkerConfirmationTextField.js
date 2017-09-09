import Dialog from 'material-ui/Dialog';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';
import PlacesAutocomplete from './PlacesAutocomplete';

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
  },
};

class WalkerConfirmationTextField extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const inputProps = {
      value: this.props.location,
      onChange: (v) => this.props.handleTextInputChange('location', v),
    }
    return (
      <div>
      <text>{this.props.start} to {this.props.end}</text>
      <br />
        <PlacesAutocomplete inputProps={inputProps} label={"Address or Area"} />
      <br />
      <TextField
        floatingLabelText="Price per Hour"
        type="number"
        min="20"
        step="1.00"
        max="100"
        floatingLabelStyle={styles.floatingLabelStyle}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        onChange={(e, v) => {this.props.handleTextInputChange('price', v); }}
        fullWidth={true}/>
      </div>
    )
  }
}

export default WalkerConfirmationTextField;
