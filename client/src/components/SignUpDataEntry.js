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
          defaultSelected={this.props.owner ? "Owner" : "Walker"}
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
      </div>
    );
  }
}

export default SignUpDataEntry;
