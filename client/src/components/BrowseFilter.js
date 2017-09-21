import React from 'react';
import BrowseSort from './BrowseSort';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import PlacesAutocomplete from './PlacesAutocomplete';
import moment from 'moment';
import '../../../public/componentCSS/browse_filter.css';

const font = "'Pontano Sans', sans-serif";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#66BB6A',
    primary2Color: '#66BB6A',
    pickerHeaderColor: '#66BB6A'
  },
  fontFamily: font
});

class BrowseFilter extends React.Component {
  constructor(props) {
    super(props);
    const todayJS = moment().startOf('day').toDate();
    this.state = {
      disableFilter: true,
      minDate: todayJS,
      startDate: todayJS,
      duration: null,
      pickupTime: null,
      price: 100,
      selectedSort: 'price'
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSelectDuration = this.handleSelectDuration.bind(this);
    this.handleSortRadio = this.handleSortRadio.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.backButton;
  }

  handleLocationChange(value) {
    this.props.setPickupAddress(value);
  }

  handleChangeAdditional(key, event, value) {
    this.setState({
      [key]: value,
    }, this.handleUpdateState);
  }

  handleSelectDuration(event, index, duration) {
    this.setState({duration}, this.handleUpdateState);
  }

  handleUpdateState() {
    if (this.state.duration && this.state.pickupTime) {
      this.setState({['disableFilter']: false});
    } else {
      this.setState({['disableFilter']: true});
    }
  }

  handleSortRadio(event, value) {
    this.setState({
      selectedSort: value
    });
  }

  handleClearFilter() {
    const todayJS = moment().startOf('day').toDate();
    this.setState({
      disableFilter: true,
      minDate: todayJS,
      startDate: todayJS,
      duration: null,
      pickupTime: null,
      price: 100
    }, this.props.emptyWalks);
  }

  render() {
    const inputProps = {
      value: this.props.pickupAddress,
      onChange: (v) => this.handleLocationChange(v),
    };
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Drawer
            docked={false}
            open={this.props.filterOpen}
            onRequestChange={this.props.toggleFilter}
            overlayStyle={{ opacity: 0.3 }}
          >
            <AppBar
              title="FILTER"
              showMenuIconButton={false}
              iconElementRight={<IconButton><NavigationChevronLeft /></IconButton>}
              onRightIconButtonTouchTap={this.props.toggleFilter}/>
            <MenuItem>
              <PlacesAutocomplete inputProps={inputProps} label={'Pickup Address'} />
            </MenuItem>
            <MenuItem>
              <DatePicker
                floatingLabelText="Pickup Date"
                hintText="Pickup Date"
                autoOk={true}
                minDate={this.state.minDate}
                disableYearSelection={true}
                defaultDate={this.state.minDate}
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
              <BrowseSort handleSortRadio={this.handleSortRadio} />
            </MenuItem>
            <MenuItem>
              <RaisedButton label="Apply Filter" disabled={this.state.disableFilter} primary={true} onClick={this.props.getWalks.bind(this, this.state)} />
            </MenuItem>
            <MenuItem>
              <RaisedButton label="Clear Filter"  primary={true} onClick={this.handleClearFilter} />
            </MenuItem>
          </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default BrowseFilter;
