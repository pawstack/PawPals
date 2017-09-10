const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));
const db = require('bookshelf')(knex);
const curl = require('curlrequest');
const config = require('config')['stripe'];
const stripe = require('stripe')(config.secretKey);
const controllers = require('./');
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

db.plugin('registry');

module.exports.getFilteredWalks = (req, res) => {
  console.log(req.body, 'body')
  var filters = req.body;
  new Date(req.body.minDate).toISOString();
  if (req.body.startDate === '' && req.body.pickupTime === '') {
    console.log('two null;')
    var start = Moment(new Date(req.body.minDate).toISOString());
    var finish = start.clone().endOf('day');
  } else if (req.body.pickupTime !== '' && req.body.startDate !== '') {
    console.log('no null')
    var startDateJS = new Date(req.body.startDate);
    var pickupTimeJS = new Date(req.body.pickupTime);
    var date = Moment(startDateJS).startOf('day');
    var start = date.clone();
    var finish = date.clone();
    var hour = Moment(pickupTimeJS).get('hour');
    var minute = Moment(pickupTimeJS).get('minute');
    start.add(hour, 'h').add(minute, 'm')
    finish.add(hour, 'h').add(minute, 'm').add(Number(req.body.duration), 'm');
  } else if(req.body.startDate === '' && req.body.pickupTime !== '') {
    console.log('start date null')
    var start = Moment(new Date(req.body.pickupTime));
    var finish = start.clone().add(Number(req.body.duration), 'm')
  } else {
    console.log('pick up time null')
    var start = Moment(new Date(req.body.minDate).toISOString());
    var finish = start.clone().endOf('day');
  }
  console.log(start, 'start')
  console.log(finish, 'finish')
  models.Walk
    .query((qb) => {
      qb.where('price', '<=', filters.price)
        .where('session_start', '<=', new Date(start.toDate()))
        .where('session_end', '>=', new Date(finish.toDate()))
        .limit(20);
    })
    .fetchAll({
      withRelated: ['walker']
    })
    .then(walks => {
      console.log(walks.models, 'walks')
      res.status(200).send(walks);
    })
    .catch(err => {
      console.log('****** getFilteredWalks error ', err);
      res.status(503).send(err);
    });
};

module.exports.getAll = (req, res) => {
  models.Walk
    .query((qb) => {
      qb.where('walker_id', '=', req.user.id);
    })
    .fetchAll({withRelated: ['dog', 'owner']})
    .then((collection) => {
      var response = {};
      response['walks'] = collection.models;
      response['location'] = req.user.address;
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  models.Walk.forge({
    session_start: req.body.session_start,
    session_end: req.body.session_end,
    walk_zone_pt: req.body.walk_zone_pt,
    price: req.body.price,
    walker_id: req.user.id,
    longitude: req.body.longitude,
    latitude: req.body.latitude
  })
    .save()
    .then(() => {
      models.Walk
        .query((qb) => {
          qb.where('walker_id', '=', req.user.id);
        })
        .fetchAll({withRelated: ['dog', 'owner']})
        .then((collection) => {
          var response = {};
          response['walks'] = collection.models;
          response['location'] = req.user.address;
          res.status(200).send(response);
        })
        .catch(err => {
          res.status(503).send(err);
        });
    });
};

module.exports.destroy = (req, res) => {
  new models.Walk({id: req.body.walk_id})
    .destroy()
    .then(() => {
      models.Walk
        .query((qb) => {
          qb.where('walker_id', '=', req.user.id);
        })
        .fetchAll({withRelated: ['dog', 'owner']})
        .then((collection) => {
          var response = {};
          response['walks'] = collection.models;
          response['location'] = req.user.address;
          res.status(200).send(response);
        })
        .catch(err => {
          res.status(503).send(err);
        });
    });
};

module.exports.saveDog = (req, res) => {
  var dogToDB = new Promise(
    (resolve, reject) => {
      knex('dogs').insert({
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        profile_pic: req.body.profile_pic,
        breed: req.body.breed,
        extras: req.body.extras,
        owner_id: req.user.id})
        .then(resolve());
    }
  );

  var ownerToDB = new Promise(
    (resolve, reject) => {
      knex('profiles').where('id', req.user.id).update({ owner: true,
        phone: req.body.phone,
        address: req.body.address
      })
        .then(resolve());
    }
  );

  Promise.all([dogToDB, ownerToDB]).then(responses => {
    res.send(200);
  })
    .catch(e => {
      console.log(e);
    });
};

module.exports.saveWalker = function(req, res) {
  knex('profiles').where('id', req.user.id).update({
    about_me: req.body.extras,
    walker: true,
    profile_pic: req.body.profile_pic,
    phone: req.body.phone,
    address: req.body.address
  })
    .then(res.send(200));
};

module.exports.updateOwnerProfile = (req, res) => {
  console.log('UPDATE OWNER', req.body.profile_pic);

  var dogUpdate = new Promise(
    (resolve, reject) => {
      knex('dogs').where('id', req.body.id).update({
        name: req.body.name,
        weight: req.body.weight,
        breed: req.body.breed,
        profile_pic: req.body.profile_pic,
        extras: req.body.extras
      })
        .then(resolve());
    }
  );

  var ownerUpdate = new Promise(
    (resolve, reject) => {
      knex('profiles').where('id', req.user.id).update({
        phone: req.body.phone,
        address: req.body.address
      })
        .then(resolve());
    }
  );

  Promise.all([dogUpdate, ownerUpdate]).then(responses => {
    res.send(200);
  })
    .catch(e => {
      console.log(e);
    });
};

module.exports.updateWalkerProfile = (req, res) => {
  console.log('UPDATE WALKER', req.body.name);

  knex('profiles').where('id', req.user.id).update({
    phone: req.body.phone,
    address: req.body.address,
    profile_pic: req.body.profile_pic,
    about_me: req.body.about_me
  })
    .then(res.send(200));
};

module.exports.getAndSaveStripeID = (req, res) => {
  curl.request({
    url: 'https://connect.stripe.com/oauth/token',
    data: {
      'client_secret': config.secretKey,
      'code': req.query.code, // from the query data of the ajax get request.
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
  });
};

module.exports.getAndsaveCardToken = (req, res) => {
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken //stripe checkout creates a token for the CC
  })
    .then((customer) => {
      console.log('the (tokenized) customer id for this new card is ', customer.id);
      var tokenizedCard = customer.id;
      controllers.Profiles.saveTokenizedCC(req.user.email, tokenizedCard);
    })
    .then(() => {
      getUserType(req.user.id)
        .then((owner) => {
          console.log('the data for owner is ', owner);
          if (owner) {
            res.redirect('/browse');
          } else {
            res.redirect('/walker');
          }
        });
    });
};

module.exports.processPayment = (req, res) => {
  controllers.Profiles.getCCToken(req.user.id)
    .then((tokenizedCC) => {
      controllers.Profiles.getStripeID(req.body.walkerUserID)
        .then((destinationStripeID) => {
          stripe.charges.create({
            amount: req.body.amount, // Amount that the Customer is charged
            description: req.body.description,
            currency: 'USD',
            customer: tokenizedCC,
            destination: {
              amount: req.body.amount * (1 - (req.body.percentRetainedByPlatform / 100)), // Amount transferred to the destination account.
              account: destinationStripeID // Account where funds will be deposited.
            }
          })
            .then(charge => {
              console.log('the charge details are ', charge);
              if (charge.paid === true) {
                saveChargeTransactionToDB(req.body.walkID, charge.id, req.body.ownerID, req.body.dogID, req.body.pickupAddress);
              }
              res.redirect('/browse'); //update this later!
            });
        });
    });
};

module.exports.getOwnerProfile = function(req, res) {
  knex.select().from('profiles').where('id', req.user.id)
    .then(data => { res.status(201).send(data); });
};

module.exports.getDogProfile = function(req, res) {
  knex.select().from('dogs').where('owner_id', req.user.id)
    .then(data => { res.status(201).send(data); });
};

module.exports.getWalkerProfile = function(req, res) {
  knex.select().from('profiles').where('id', req.user.id)
    .then(data => { res.status(201).send(data); });
};

module.exports.refundPayment = (req, res) => {
  getTransactionID(req.body.walkID)
    .then((transactionID) => {
      console.log('transactionID is ', transactionID);
      stripe.refunds.create({
        charge: transactionID,
        reverse_transfer: true
      })
        .then(function(refund) {
          console.log('refund completed ', refund);
          reverseChargeTransctionInDB(req.body.walkID);
        });
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(503);
    });
};

var saveChargeTransactionToDB = (walkID, transactionNumber, ownerID, dogID, pickupAddress) => {
  return knex('walks')
    .where({id: walkID, paid: false})
    .update({
      paid: true,
      payment_transaction_id: transactionNumber,
      owner_id: ownerID,
      dog_id: dogID,
      pickup_address: pickupAddress
    })
    .then(result => {
      if (result === 0) {
        console.log('error saving charge transaction to DB');
      }
    });
};

var getTransactionID = (walkID) => {
  return knex('walks')
    .select('payment_transaction_id')
    .where({id: walkID, paid: true})
    .then(result => {
      if (result.length === 0) {
        console.log('error retireiving transaction id from db');
        throw result;
      } else {
        console.log('the resulting transaction id is ', result);
        return result[0].payment_transaction_id;
      }
    })
    .catch(() => {
      console.log('there is no transaction stored in the db for this walk');
    });
};

var reverseChargeTransctionInDB = (walkID) => {
  return knex('walks')
    .where({id: walkID, paid: true})
    .update({
      paid: false,
      payment_transaction_id: null
    })
    .then(result => {
      if (result === 0) {
        throw result;
      } else {
        console.log('the charge for walkid ', walkID, ' has been reversed');
        return result;
      }
    })
    .catch(result => {
      console.log('error updating transaction details from DB');
    });
};

var getUserType = (userID) => {
  return knex('profiles')
    .select('owner')
    .where({id: userID})
    .then((result) => {
      console.log('Is the user an owner ? ', result[0].owner);
      return result[0].owner;
    });
};


module.exports.getDogInfo = (req, res) => {
  return knex('dogs')
    .where({owner_id: req.query.ownerID})
    .then((result) => {
      res.send(result[0]);
    });
};

module.exports.saveWalkGeolocation = (req, res) => {
  var geolocation = req.body;
  models.Geolocation.forge({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    timestamp: new Date(req.body.timestamp),
    accuracy: req.body.accuracy,
    walk_id: req.body.walk_id
  })
    .save()
    .then(geolocation => {
      res.status(201).send(geolocation);
    })
    .catch(err => {
      console.log('ERROR trying to save a walk geolocation: ', err);
      res.status(500).send(err);
    });
};

module.exports.fetchGeolocations = (req, res) => {
  var walkId = Number(req.query.walkId);
  models.Geolocation.where('walk_id', walkId)
    .fetchAll()
    .then(geolocations => {
      res.status(200).send(geolocations);
    })
    .catch(err => {
      console.log('ERROR trying to fetch all geolocations for walk_id:' + walkId + ' ', err);
      res.status(500).send(err);
    });
};

module.exports.getCurrentWalk = function(req, res) {
  models.Walk
    .query((qb) => {
      qb.where({'owner_id': req.user.id,
        'paid': true});
    })
    .where('session_start', '>=', new Date())
    .fetchAll({
      withRelated: ['walker']
    })
    .then(walks => {
      res.status(200).send(walks);
    })
    .catch(err => {
      console.log('****** getFilteredWalks error ', err);
      res.status(503).send(err);
    });
};

module.exports.getPastWalk = function(req, res) {
  models.Walk
    .query((qb) => {
      qb.where({'owner_id': req.user.id,
        'paid': true});
    })
    .where('session_end', '<=', new Date())
    .fetchAll({
      withRelated: ['walker']
    })
    .then(walks => {
      res.status(200).send(walks);
    })
    .catch(err => {
      console.log('****** getFilteredWalks error ', err);
      res.status(503).send(err);
    });
};


module.exports.ownerCancelWalk = function(req, res) {

  var cancelDBUpdate = new Promise(
    (resolve, reject) => {
      knex('walks').where('id', req.body.walkID).update({
        owner_id: null,
        dog_id: null,
        paid: false
      })
        .then(resolve());
    }
  );

  var refundPaymentOwner = new Promise(
    (resolve, reject) => {
      module.exports.refundPayment(req, res)
        .then(resolve());
    }
  );

  Promise.all([cancelDBUpdate, refundPaymentOwner]).then(responses => {
    console.log('cancel res sent');
    res.send(200);
  })
    .catch(e => {
      console.log(e);
    });

};

