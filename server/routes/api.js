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
  .get(ApiController.getAndSaveStripeID);

router.route('/signup/payment/tokenizecard')
  .get((req, res) => {
    res.render('cardtoken.ejs');
  });

router.route('/signup/payment/savecardtoken') //post request from the ejs file.... need to update
  .post(ApiController.getAndsaveCardToken);









module.exports = router;
