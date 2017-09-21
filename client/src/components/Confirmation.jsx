import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import '../../../public/componentCSS/confirmation.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#66BB6A',
    pickerHeaderColor: '#66BB6A',
  },
});

class Confirmation extends React.Component {

  constructor(props) {
    super(props);
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
  }

  componentDidMount() {
    var totalPrice = this.calculateTotalPrice();
    this.props.updateTotalPrice(totalPrice);
  }

  calculateTotalPrice() {
    if (this.props.start_owner && this.props.end_owner) {
      var start = moment(this.props.start_owner);
      var end = moment(this.props.end_owner);
    } else {
      var start = moment(this.props.selectedWalk.session_start);
      var end = moment(this.props.selectedWalk.session_end);
    }
    var durationInHours = end.diff(start, 'minutes') / 60;
    return durationInHours * this.props.selectedWalk.price;
  }

  render() {
    if (this.props.start_owner && this.props.end_owner) {
      var start = moment(this.props.start_owner).format('h:mm A');
      var end = moment(this.props.end_owner).format('h:mm A');
    } else {
      var start = moment(this.props.selectedWalk.session_start).format('h:mm A');
      var end = moment(this.props.selectedWalk.session_end).format('h:mm A');
    }
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>

            <Card className="confirmation-card">

              <CardMedia
                overlay={<CardTitle title="Confirm your selection"/>}
              >
                <img src="" alt="" />
              </CardMedia>
              <CardTitle
                title={`${start} at ${end}`}
                subtitle= {`${this.props.dogInfo.name}'s upcoming walk with ${this.props.selectedWalk.walker.display}`}
                subtitleStyle={{'fontSize': '15px'}}
              />

              <CardHeader
                title={this.props.selectedWalk.walker.display}
                subtitle={this.props.selectedWalk.walker.about_me}
                avatar={this.props.selectedWalk.walker.profile_pic }
                titleStyle={{'fontSize': '20px', 'fontWeight': 'bold'}}
                subtitleStyle={{'fontSize': '15px'}}
              />

              <div>
                <TextField
                  defaultValue={start}
                  floatingLabelText="Pick-Up Time"
                  disabled={true}
                  className="confirmation-text-field"
                />
              </div>
              <div>
                <TextField
                  defaultValue={end}
                  floatingLabelText="Drop-Off Time"
                  disabled={true}
                  className="confirmation-text-field"
                />
              </div>
              <div>
                <TextField
                  defaultValue={this.props.pickupAddress}
                  floatingLabelText="Pick-Up Location"
                  disabled={true}
                  className="confirmation-text-field-address"
                />
              </div>

              <CardText>
                The total price for this walk will be <b>${this.props.totalPrice.toFixed(2)} USD</b>.
              </CardText>
              <CardActions>
                <RaisedButton label="BACK TO BROWSE" primary={true} onClick = {this.props.resetSelectedState}/>
                <RaisedButton label="BOOK NOW" primary={true} onClick = {this.props.processPayment}/>
              </CardActions>
            </Card>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Confirmation;
