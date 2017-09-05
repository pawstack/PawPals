'use strict';
const express = require('express');
const router = express.Router();
const WalkerController = require('../controllers').Walks;

router.route('/fetch')
  .get(WalkerController.getAll)

router.route('/create')
  .post(WalkerController.create)

module.exports = router;
