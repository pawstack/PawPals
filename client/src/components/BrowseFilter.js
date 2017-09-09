import React from 'react';
import Slider from 'material-ui/Slider';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

class BrowseFilter extends React.Component {
  constructor(props) {
    super(props);
    const minDate = new Date(new Date().setHours(0, 0, 0, 0));

    this.state = {
      minDate: minDate,
      startDate: minDate,
      endDate: new Date(minDate.getTime() + (1000 * 60 * 60 * 24 * 14 + 86399000)),
      duration: null,
      pickupTime: null,
      price: 100
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSelectDuration = this.handleSelectDuration.bind(this);
  }

  componentWillMount() {
    this.props.getWalks(this.state);
  }

  handleLocationChange(event) {
    const name = event.target.name;
    this.props.setPickupAddress(event.target.value);
  }

  handleChangeAdditional(key, event, value) {
    this.setState({
      [key]: value,
    });
  }

  handleSelectDuration(event, index, duration) {
    this.setState({duration});
  }

  render() {
    return (
      <div>
        <Drawer docked={true}>
          <AppBar title="Filter" showMenuIconButton={false} />
          <MenuItem>
            <TextField
              id="filter-location"
              hintText="e.g. 944 Market St, San Francisco"
              floatingLabelText="Pickup Address"
              name="location"
              value={this.props.pickupAddress}
              onChange={this.handleLocationChange}
            />
          </MenuItem>
          <MenuItem>
            <DatePicker
              floatingLabelText="Pickup Date"
              hintText="Pickup Date"
              autoOk={true}
              minDate={this.state.minDate}
              disableYearSelection={true}
              value={this.state.startDate}
              onChange={this.handleChangeAdditional.bind(this, 'startDate')}
            />
          </MenuItem>
          <MenuItem>
            <TimePicker
              format="ampm"
              floatingLabelText="Pickup Time"
              minutesStep={5}
              autoOk={true}
              value={this.state.pickupTime}
              onChange={this.handleChangeAdditional.bind(this, 'pickupTime')}
            />
          </MenuItem>
          <MenuItem>
            <SelectField
              floatingLabelText="Walk Duration"
              value={this.state.duration}
              onChange={this.handleSelectDuration}
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value={30} primaryText="30 minutes" />
              <MenuItem value={60} primaryText="1 hour" />
              <MenuItem value={90} primaryText="1 hour 30 minutes" />
              <MenuItem value={120} primaryText="2 hours" />
            </SelectField>
          </MenuItem>
          <MenuItem>
            <Subheader>Price per hour: {this.state.price}</Subheader>
            <Slider
              min={0}
              max={100}
              step={1}
              value={this.state.price}
              onChange={this.handleChangeAdditional.bind(this, 'price')}
            />
          </MenuItem>
          <MenuItem>
            <RaisedButton label="Apply Filter" primary={true} onClick={this.props.getWalks.bind(this, this.state)} />
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default BrowseFilter;
