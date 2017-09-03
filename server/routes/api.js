'use strict';
const express = require('express');
const router = express.Router();

router.route('/walks/search')
  .post((req, res) => {
    var filters = req.body;
    res.status(201).json({
      walks: [
        {
          id: 1,
          walkerId: 2,
          walkerName: 'Paw Walker',
          walkzonePt: '944 Market St, San Francisco, CA 94102',
          walkzoneRadius: 3,
          price: 40
        },
        {
          id: 2,
          walkerId: 3,
          walkerName: 'Vin Beagle',
          walkzonePt: '611 Mission St, San Francisco, CA 94105',
          walkzoneRadius: 3,
          price: 45
        },
        {
          id: 4,
          walkerId: 5,
          walkerName: 'Michelle Ruffriguez',
          walkzonePt: '1655 Mission St, San Francisc, CA 94103',
          walkzoneRadius: 3,
          price: 38
        }
      ]
    });
  });

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

module.exports = router;
