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
    this.state = {
      owner: false,
      walker: true
    };
  }

  updatePhone(e) {
    const phone = e.target.value;
    this.props.entriesChanged( this, 'phone', phone );
  }

  updateAddress(e) {
    const address = e.target.value;
    this.props.entriesChanged( this, 'address', address);
  }

  getOwnerValue(e, value) {
    //console.log('Owner is', value.returnValue);
    this.setState({
      owner: true,
      walker: false
    }, ()=>{
      this.props.updateRoleState(this);
    });
  }

  getWalkerValue(e, value) {
    //console.log('Walker is', value.returnValue);
    this.setState({
      owner: false,
      walker: true
    }, ()=>{
      this.props.updateRoleState(this);
    });
  }

  render() {
    const inputProps = {
      value: this.props.address,
      onChange: (v) => { this.updateAddress(v); },
    };
    return (
      <div>
        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
          <RadioButton
            value="light"
            label="Owner"
            style={styles.radioButton}
            onClick = {this.getOwnerValue.bind(this)}
          />
          <RadioButton
            value="not_light"
            label="Walker"
            style={styles.radioButton}
            onClick = {this.getWalkerValue.bind(this)}
          />
        </RadioButtonGroup>
        <TextField
          id="phone-info"
          hintText="e.g. 9498786181"
          floatingLabelText="Phone #"
          name="phone"
          onChange={this.updatePhone.bind(this)}
          fullWidth={true}/>
        <div>
          <TextField
            id="address-info"
            hintText="e.g. 944 Market St"
            floatingLabelText="Address"
            name="address"
            onChange={this.updateAddress.bind(this)}
            fullWidth={true}/>
        </div>
      </div>
    );
  }
}

export default SignUpDataEntry;
