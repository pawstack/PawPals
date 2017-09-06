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



class Payment extends React.Component {

  constructor(props) {
    super(props);

    this.processPayment = this.processPayment.bind(this);
    this.requestRefundForCancellation = this.requestRefundForCancellation.bind(this);
    this.handleStripeRegistration = this.handleStripeRegistration.bind(this);
  }

  processPayment() {
    console.log('client - /api/walks/payment create a destination charge button clicked');
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
        console.log('client - successful destination charge post request completed');
      },
      error: function() {
        console.log('client - error destination charge post request completed');
      }
    });
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

  handleStripeRegistration() { // AJAX - doesn't work.  Work around. Fix Later.
    console.log('button clicked to handle stripe registration');
    $.ajax({
      type: 'POST',
      url: '/stripe',
      data: {
        redirect_uri: 'http://localhost:3000/',
        client_id: 'ca_BKKqX6IKWv2zjuHsLKdReiYfTfnaNPIE',
        state: 'test123'
      },
      success: () => {
        console.log('client - successfully registered with stripe');
      },
      error: (error) => {
        console.log('client - error in registering with stripe', error);
      }
    });
  }




  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div>
              <RaisedButton onClick = {this.handleStripeRegistration} label="Connect with Stripe - AJAX" primary={true}/>
            </div>
            <div>
              <a href = 'https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:3000/&client_id=ca_BKKqX6IKWv2zjuHsLKdReiYfTfnaNPIE&state=testing123'>
                <RaisedButton label="Connect with Stripe" primary={true}/>
              </a>
            </div>
            <div>
              <RaisedButton onClick = {this.processPayment} label="Create a Destination Charge" primary ={true}/>
            </div>
            <div>
              <RaisedButton onClick = {this.requestRefundForCancellation} label = "Request Refund for Cancellation" primary = {true}/>
            </div>
          </div>
        </MuiThemeProvider>
        <h1>Payment</h1>
        <div>
          <a href = 'https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://stripe.com/connect/default/oauth/test&client_id=ca_BKKqX6IKWv2zjuHsLKdReiYfTfnaNPIE&state=testing123'>TRY 9 - Default Redirect</a>
        </div>
        <button onClick = {this.handleTestPayClick}>connect with stripe</button>
      </div>
    );
  }
}

export default Payment;
