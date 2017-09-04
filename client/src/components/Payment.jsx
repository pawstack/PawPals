import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import $ from 'jquery';

class Payment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleTestPayClick = this.handleTestPayClick.bind(this);
    this.createDestinationCharge = this.createDestinationCharge.bind(this);
    this.requestRefundForCancellation = this.requestRefundForCancellation.bind(this);
  }


  handleSubmit() {
    if (checkEmptyEntry(this.state)) {
      console.log(this.state);
      alert('please complete profile');
    } else {
      console.log(this.state);
      $.ajax({
        url: '/api/signup/owner',
        type: 'POST',
        data: {
          name: this.state.name,
          age: this.state.age,
          breed: this.state.breed,
          weight: this.state.weight,
          profile_pic: this.state.imagePreviewUrl,
          extras: this.state.extra
        },
        success: (res) => {
          console.log('data sent');
        },
        error: function(data) {
        }
      });
    }
  }

  handleTestPayClick() {
    console.log('payment button clicked');
    $.ajax({
      type: 'GET',
      url: '/api/payment/',
      data: {
        test: 'test'
      },
      success: function() {
        console.log('client - successful get request completed');
      },
      error: function() {
        console.log('client - error in get request');
      }
    });
  }

  createDestinationCharge() {
    console.log('create a destination charge button clicked');
    $.ajax({
      type: 'POST',
      url: '/destinationcharge',
      data: {
        amount: 1200,
        stripeEmail: 'tiffany.c.choy@gmail.com',
        stripeToken: 'tok_visa',
        description: 'testing the destination charge functionality',
        accountDestination: 'acct_1AxqcZDNt3jy6C6m',
        customerId: 'placeholder'//generated when a new customer registers at the site.
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
      url: '/cancellationrefund',
      data: {
        chargeId: 'ch_1AyOtaITvzEYPq0XhUJqSZKV' // later to be retrieved from database, walk table.  (this was saved when a payment was successful)
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
        <h1>Payment</h1>

        <button onClick = {this.handleTestPayClick}>connect with stripe</button>
        <div>
          <a href = 'https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://stripe.com/connect/default/oauth/test&client_id=ca_BKKqX6IKWv2zjuHsLKdReiYfTfnaNPIE&state=testing123'>TRY 9 - Default Redirect</a>
        </div>
        <div>
          <a href = 'https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:3000/&client_id=ca_BKKqX6IKWv2zjuHsLKdReiYfTfnaNPIE&state=testing123'>TRY 10 - back to local host (STEP 1-4)</a>
        </div>
        <a href = 'https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://google.com&client_id=ca_BKKqX6IKWv2zjuHsLKdReiYfTfnaNPIE&state=tiffany'>BUTTON 2</a>
        <a href = 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_BKKqX6IKWv2zjuHsLKdReiYfTfnaNPIE&scope=read_write&redirect_uri=https://google.com'>BUTTON 3</a>
        <div>
          <a href = 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_BKKqX6IKWv2zjuHsLKdReiYfTfnaNPIE&scope=read_write&redirect_uri=http://localhost:3000/'>CREATE A NEW ACCOUNT</a>

        </div>
        <a href = 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_BKKqX6IKWv2zjuHsLKdReiYfTfnaNPIE&scope=read_write&redirect_uri=http://localhost:3000/&stripe_user[email]=test@gmail.com'>BUTTON 5</a>

        <div><button onClick = {this.createDestinationCharge}>Create a Destination Charge</button></div>
        <div><button onClick = {this.requestRefundForCancellation}>Request Refund for Cancellation</button></div>

      </div>
    );
  }
}

export default Payment;
