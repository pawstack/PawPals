'use strict';
const express = require('express');
const router = express.Router();
const ApiController = require('../controllers').Api;
var curl = require('curlrequest');
var controllers = require('../controllers');
var stripe = require('stripe')('sk_test_2slmpAIrhlZSnWP7KSMNp6HX');

router.route('/walks/search')
  .post(ApiController.getFilteredWalks);


router.route('/walks/fetch')
  .get(ApiController.getAll);

router.route('/walks/create')
  .post(ApiController.create);

router.route('/signup/owner')
  .post(ApiController.saveDog);

router.route('/signup/walker')
  .post(ApiController.saveWalker);

router.route('/walks/destroy')
  .delete(ApiController.destroy)

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/signup/payment/stripeid')
  .get((req, res) => {
    console.log('*********** inside of /signup/stripeid');
    curl.request({
      url: 'https://connect.stripe.com/oauth/token',
      data: {
        'client_secret': 'sk_test_2slmpAIrhlZSnWP7KSMNp6HX', // need to change this periodically
        'code': req.query.code, //'ac_BKskFL5z0e7rB4OySIe0EKWVFiD1wFVw', pull this in from the query data of the ajax get request.
        'grant_type': 'authorization_code'
      }
    }, function(err, stdout, meta) {
      console.log('curl request completed...');
      console.log('stdout ', stdout);
      var stripe_user_id = JSON.parse(stdout).stripe_user_id;
      controllers.Profiles.saveStripeUserID(req.query.userid, stripe_user_id)
        .then(() => {
          console.log('redirecting to api/payment');
          res.redirect('/api/signup/payment/tokenizecard'); //redirect to the page where the user will input their CC info.
        });

      //res.send(JSON.parse(stdout).stripe_user_id);
      //now save the stripe_user_id in the database under the user!
      //res.redirect('/api/payment');//redirect to the page where the user will input their CC info.
      //create a customer object - Customer objects allow you to perform recurring charges and
      //  track multiple charges that are associated with the same customer.
      //  The API allows you to create, delete, and update your customers.
      //  You can retrieve individual customers as well as a list of all your customers.
      //then redirect back to the home page?  res.redirect('/home');
      //res.send(200);
    });
  });

router.route('/signup/payment/tokenizecard')
  .get((req, res) => {
    console.log('*****Inside of api/signup/tokenizecard');
    res.render('cardtoken.ejs');
    // res.status(200).send('Hello World!');
  });

router.route('/signup/payment/savecardtoken') //post request from the ejs file.... need to update
  .post((req, res) => {
    console.log('******* INSIDE OF SIGNUP/PAYMENT/SAVECARDTOKEN');
    console.log('the req body is ', req.body);
    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken //stripe checkout creates a token for the CC
    })
      .then((customer) => {
        console.log('the (tokenized) customer id for this new card is ', customer.id);
        var tokenizedCard = customer.id;
        controllers.Profiles.saveTokenizedCC(req.user.email, tokenizedCard) //SAVE THE CUSTOMER ID TO THE DB! userid, token
          .then(() => {
            res.redirect('/');
          });
      });
  });









module.exports = router;
