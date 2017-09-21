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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../../../public/componentCSS/payment.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#66BB6A',
    pickerHeaderColor: '#66BB6A'
  },
});

class Payment extends React.Component {

  constructor(props) {
    super(props);

    this.processPayment = this.processPayment.bind(this);
    this.requestRefundForCancellation = this.requestRefundForCancellation.bind(this);
  }

  processPayment() {

    $.ajax({
      type: 'POST',
      url: '/api/walks/payment',
      data: {
        amount: 1200,  //TBD WHEN BOOKED
        walkerUserID: 1, //TBD WHEN BOOKED.  This will come from the selected walk state.
        walkID: 1, //TBD WHEN BOOKED.
        description: 'testing the destination charge functionality',
        percentRetainedByPlatform: 10
      },
      success: function() {

      },
      error: function() {
        console.log('client - error destination charge post request completed');
      }
    });
  }

  requestRefundForCancellation() {

    $.ajax({
      type: 'POST',
      url: '/api/walks/refund',
      data: {
        walkID: 1, //TBD WHEN BOOKED.
      },
      success: function() {

      },
      error: function() {
        console.log('client - successful cancellation refund completed');
      }
    });
  }

  render() {
    const url = new URL(window.location.href);
    const callbackUrl = `${url.protocol}//${url.hostname}${url.port.length > 0 ? ':' + url.port : url.port}`;
    const state = Math.floor(Math.random() * 1000);
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div className = 'buttonCenter'>

            <div>
              <a href = {`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${callbackUrl}/&client_id=ca_BKKqX6IKWv2zjuHsLKdReiYfTfnaNPIE&state=${state}`}>
                <RaisedButton label="Connect with Stripe" primary={true}/>
              </a>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Payment;
