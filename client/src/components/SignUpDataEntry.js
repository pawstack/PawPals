import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import PlacesAutocomplete from './PlacesAutocomplete';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class SignUpDataEntry extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   owner: false,
    //   walker: true
    // };
    this.updatePhone = this.updatePhone.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.handleUserType = this.handleUserType.bind(this);
  }

  updatePhone(e) {
    const phone = e.target.value;
    this.props.entriesChanged('phone', phone );
  }

  updateAddress(e) {
    this.props.entriesChanged( 'address', e);
  }

  handleUserType(event) {
    console.log('the user type is ', event.target.value);
    this.props.updateUserType(event.target.value);
  }

  render() {
    const inputProps = {
      value: this.props.address,
      onChange: (v) => { this.updateAddress(v); },
    };
    return (
      <div>
        <RadioButtonGroup
          name="shipSpeed"
          defaultSelected="Owner"
        >
          <RadioButton
            value="Owner"
            label="Dog Owner"
            style={styles.radioButton}
            onClick = {this.handleUserType}
          />
          <RadioButton
            value="Walker"
            label="Dog Walker"
            style={styles.radioButton}
            onClick = {this.handleUserType}
          />
        </RadioButtonGroup>
        <TextField
          id="phone-info"
          hintText="e.g. 9498786181"
          floatingLabelText="Phone #"
          name="phone"
          onChange={this.updatePhone}
          fullWidth={true}
        />
        <div>
          <PlacesAutocomplete
            inputProps={inputProps}
            label={'Address'}
          />
        </div>
      </div>
    );
  }
}

export default SignUpDataEntry;
