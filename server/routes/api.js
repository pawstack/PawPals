'use strict';
const express = require('express');
const router = express.Router();
const ApiController = require('../controllers').Api;

router.route('/walks/search')
  .post(ApiController.getFilteredWalks);

router.route('/walks/fetch')
  .get(ApiController.getAll)

router.route('/walks/create')
  .post(ApiController.create)

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

module.exports = router;
