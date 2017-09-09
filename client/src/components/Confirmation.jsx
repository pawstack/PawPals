import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import moment from 'moment';


class Confirmation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0
    };

    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
  }

  componentDidMount() {
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    var start = moment(this.props.selectedWalk.session_start);
    var end = moment(this.props.selectedWalk.session_end);
    var durationInHours = moment.duration(end.diff(start)) / 1000 / 60 / 60;
    this.setState({
      totalPrice: durationInHours * this.props.selectedWalk.price
    });
    console.log('the duration is ', durationInHours);
  }


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>

            <Card>

              <CardMedia
                overlay={<CardTitle title="Confirm your selection"/>}
              >
                <img src="" alt="" />
              </CardMedia>
              <CardTitle
                title={`${(moment(this.props.selectedWalk.session_start)
                  .format('dddd, MMMM Do'))} at ${(moment(this.props.selectedWalk.session_start)
                  .format('h:mm A'))}`
                }

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
                  defaultValue={moment(this.props.selectedWalk.session_start).format('h:mm A')}
                  floatingLabelText="Pick-Up Time"
                  disabled={true}
                  style = {{padding: 20, width: 160, fontSize: 20}}
                />
              </div>
              <div>
                <TextField
                  defaultValue={moment(this.props.selectedWalk.session_end).format('h:mm A')}
                  floatingLabelText="Drop-Off Time"
                  disabled={true}
                  style = {{padding: 20, width: 160, fontSize: 20}}
                />
              </div>
              <div>
                <TextField
                  defaultValue={this.props.pickupAddress}
                  floatingLabelText="Pick-Up Location"
                  disabled={true}
                  style = {{padding: 20, width: 450, fontSize: 20}}
                />
              </div>

              <CardText>
                The total price for this walk will be <b>${this.state.totalPrice.toFixed(2)} USD</b>.
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
