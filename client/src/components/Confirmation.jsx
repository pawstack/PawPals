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
import TextField from 'material-ui/TextField';
import moment from 'moment';


class Confirmation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };


    this.requestRefundForCancellation = this.requestRefundForCancellation.bind(this);

  }



  requestRefundForCancellation() {
    console.log('button clicked to request a refund for cancellation');
    $.ajax({
      type: 'POST',
      url: '/api/walks/refund',
      data: {
        walkID: 1, //TBD WHEN BOOKED.
      },
      success: function() {
        console.log('client - successful cancellation refund completed');
      },
      error: function() {
        console.log('client - successful cancellation refund completed');
      }
    });
  }



  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            Confirmation Page
            <Card>

              <CardMedia
                overlay={<CardTitle title="Confirm your Selection!"/>}
              >
                <img src="" alt="" />
              </CardMedia>
              <CardTitle
                title={`${(moment(this.props.selectedWalk.session_start)
                  .format('dddd, MMMM Do'))} at ${(moment(this.props.selectedWalk.session_start)
                  .format('h:mm A'))}`
                }

                subtitle= {`Cosmos upcoming walk with ${this.props.selectedWalk.walker.display}`}
              />

              <CardHeader
                title={this.props.selectedWalk.walker.display}
                subtitle={this.props.selectedWalk.walker.about_me}
                avatar={this.props.selectedWalk.walker.profile_pic}
                titleStyle={{'fontSize': '30px', 'fontWeight': 'bold'}}
                subtitleStyle={{'fontSize': '20px'}}
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
                  defaultValue="944 Market Street, San Francisco, CA"
                  floatingLabelText="Pick-Up Location"
                  disabled={true}
                  style = {{padding: 20, width: 450, fontSize: 20}}
                />
              </div>

              <CardText>
                The total price for this walk will be <b>${this.props.selectedWalk.price} USD</b>.
              </CardText>
              <CardActions>
                <RaisedButton label="BACK TO BROWSE" primary={true}/>
                <RaisedButton label="BOOK NOW" primary={true}/>
              </CardActions>
            </Card>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Confirmation;
