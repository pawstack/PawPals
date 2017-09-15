const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));
const db = require('bookshelf')(knex);
const curl = require('curlrequest');
const config = require('config')['stripe'];
const stripe = require('stripe')(config.secretKey);
const controllers = require('./');
const Moment = require('moment');


const twilio = require('twilio');

const credentials = require('./credentials.json');
const device = require('express-device');




db.plugin('registry');

module.exports.getFilteredWalks = (req, res) => {
  // implement as if walkers don't make "walk slots" but rather general
  // availability periods, and owners can book as long as their need is in that
  // period.
  if (req.body.pickupTime !== '' && req.body.startDate !== '') {
    // show all walks in period of given day and given time
    var startDate = Moment(new Date(req.body.startDate)).startOf('day');
    var pickupTime = Moment(new Date(req.body.pickupTime));
    var hour = pickupTime.get('hour');
    var minute = pickupTime.get('minute');
    var start = startDate.clone().add(hour, 'h').add(minute, 'm');
    var finish = startDate.clone().add(hour, 'h').add(minute, 'm').add(Number(req.body.duration), 'm');
    var walker_start = start.clone().subtract(15, 'm');
    var walker_finish = finish.clone().add(15, 'm');
  } else if(req.body.startDate === '' && req.body.pickupTime !== '') {
    // see all walks available today at given time
    var start = Moment(new Date(req.body.pickupTime));
    var finish = start.clone().add(Number(req.body.duration), 'm');
    var walker_start = start.clone().subtract(15, 'm');
    var walker_finish = finish.clone().add(15, 'm');
  } else {
    // see all walks available today
    var walker_start = Moment(new Date()).endOf('day');
    var walker_finish = Moment(new Date());
    var start = null;
    var finish = null;
  }
  console.log(start, 'start')
  console.log(walker_start, 'start walker')
  console.log(finish, 'finish')
  console.log(walker_finish, 'finish walker')

  // define sort order
  var criteria, withRelatedParams;
  var order = 'ASC';
  if (req.body.selectedSort === 'avg_walker_rating') {
    criteria = 'profiles.avg_walker_rating';
    order = 'DESC';
  } else {
    criteria = `walks.${req.body.selectedSort}`;
  }

  console.log(req.body, 'request body')

  models.Walk
    .query((qb) => {
      qb.where('price', '<=', req.body.price)
        .where('session_start_walker', '<=', new Date(walker_start.endOf('minute').toDate()))
        .where('session_end_walker', '>=', new Date(walker_finish.startOf('minute').toDate()))
        .innerJoin('profiles', 'walks.walker_id', 'profiles.id')
        .orderBy(criteria, order)
        .limit(20);
    })
    .fetchAll({
      withRelated: ['walker']
    })
    .then(walks => {
      var response = {};
      response['walks'] = walks;
      if (start && finish) {
        response['start'] = start.toDate();
        response['end'] = finish.toDate();
      }
      res.status(200).send(response);
    })
    .catch(err => {
      console.log('ERROR getting filtered walks ', err);
      res.status(503).send(err);
    });
};

module.exports.getWalkersWalks = (req, res) => {
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

module.exports.createWalk = (req, res) => {
  models.Walk.forge({
    session_start_walker: req.body.session_start,
    session_end_walker: req.body.session_end,
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
          console.log(response)
          res.status(200).send(response);
        })
        .catch(err => {
          res.status(503).send(err);
        });
    });
};

module.exports.destroyWalk =  (req, res) => {
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
    .then(() => {
      res.send(200);
    });
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
  console.log(req.body, 'request')
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
              if (charge.paid === true) {
                createSplitWalks(req.body.start_owner, req.body.end_owner, req.body.walkID)
                  .then(() => {
                    console.log(req.body)
                    updateExistingWalk(req.body.start_owner, req.body.end_owner, charge.id, req.body.walkID, req.body.ownerID, req.body.dogID, req.body.pickupAddress)
                  })
              }
              res.redirect('/browse'); //update this later!
            });
       })
        .catch(error => {
          console.log(error, 'stripe error')
        })
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
  return getTransactionID(req.body.walkID)
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

var updateExistingWalk = (start_owner, end_owner, transactionNumber, walkID, ownerID, dogID, pickup_address, callback) => {
  // update existing walk with booked time
  var start_walker = Moment(start_owner).subtract(15, 'm').toDate();
  var end_walker = Moment(end_owner).add(15, 'm').toDate();
  console.log(start_owner, 'start owner');
  console.log(end_owner, 'end_owner');
  return knex('walks')
    .where({id: walkID, paid: false})
    .update({
      paid: true,
      payment_transaction_id: transactionNumber,
      owner_id: ownerID,
      dog_id: dogID,
      pickup_address: pickup_address,
      session_start: start_owner,
      session_end: end_owner,
      session_end_walker: end_walker,
      session_start_walker: start_walker,
    })
    .then(callback)
    .catch(error => console.log(error, 'error database'))
}

var createSplitWalks = (start_owner, end_owner, walkID) => {
  var start_walker = Moment(start_owner).subtract(15, 'm').toDate();
  var end_walker = Moment(end_owner).add(15, 'm').toDate();
  return models.Walk.where('id', walkID)
    .fetch()
    .then((model) => {
      // create walk before booked walk
      models.Walk.forge({
        session_start_walker: model.attributes.session_start_walker,
        session_end_walker: start_walker,
        walk_zone_pt: model.attributes.walk_zone_pt,
        price: model.attributes.price,
        walker_id: model.attributes.walker_id,
        longitude: model.attributes.longitude,
        latitude: model.attributes.latitude
      })
        .save()
        .catch(err => {
          console.log(err, 'before booked walk')
        })
        .then(() => {
          // create walk after booked walk
          models.Walk.forge({
            session_start_walker: end_walker,
            session_end_walker: model.attributes.session_end_walker,
            walk_zone_pt: model.attributes.walk_zone_pt,
            price: model.attributes.price,
            walker_id: model.attributes.walker_id,
            longitude: model.attributes.longitude,
            latitude: model.attributes.latitude,
          })
            .save()
            .catch(err => {
              console.log(err, 'after booked walk')
            })
        })
    })
}

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
    .where('session_start', '<=', new Date())
    .where('session_end', '>=', new Date())
    .fetch({
      withRelated: ['walker']
    })
    .then(walk => {
      console.log('current walk ', walk);
      res.status(200).send(walk);
    })
    .catch(err => {
      console.log('ERROR getting current walk ', err);
      res.status(503).send(err);
    });
};

module.exports.getUpcomingWalks = function(req, res) {
  models.Walk
    .query((qb) => {
      qb.where({'owner_id': req.user.id,
        'paid': true});
    })
    .where('session_end', '>', new Date())
    .orderBy('session_start', 'DESC')
    .fetchAll({
      withRelated: ['walker']
    })
    .then(walks => {
      res.status(200).send(walks);
    })
    .catch(err => {
      console.log('ERROR getting upcoming walks ', err);
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
    .orderBy('session_start', 'DESC')
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
  module.exports.refundPayment(req, res)
    .then(() => {
      knex('walks').where('id', req.body.walkID).update({
        owner_id: null,
        dog_id: null,
        paid: false,
        session_start: null,
        session_end: null,
        pickup_address: null,
      })
        .catch(err => {
          console.log(error, 'error updating walks')
        })
    })
    .catch(e => {
      console.log(e, 'error refunding payment');
    });
};

//twilio request here

module.exports.getTwiliotoken = function(req, res) {
  var appName = 'Pawpals';
  var identity = req.user.id.toString();
  console.log('user id', identity);

  var deviceId = req.device.type;
  console.log('device id', deviceId);

  var endpointId = appName + ':' + identity + ':' + deviceId;

  const ipmGrant = new IpMessagingGrant({
    serviceSid: 'ISb0aa6c59d5ae4bd48c8613679dbfcfda',
    endpointId: endpointId
  });


  const token = new AccessToken(
    'ACcbfdbacef3969bbf70ebbddd67c142ec',
    'SK5c1547820e6e7bab64f1d48de43fc506',
    'mudLoZ8C9hPiNpJXF8WkessLrvvHxwOU'
  );

  token.addGrant(ipmGrant);
  token.identity = identity;

  console.log(token, 'token');
  res.send({
    identity: identity,
    token: token.toJwt(),
  });
};


module.exports.addRating = function(req, res) {
  knex('walks').where('id', req.body.walkID).update({
    ['rating_' + req.body.ratingFor]: req.body.rating
  })
    .then(result => {
      console.log('result for adding rating to the db is ', result);
      res.status(200).end();
      //res.send(200);
      //res.status(200);
    });
};

module.exports.fetchRating = function(req, res) {
  knex.select('rating_' + req.query.ratingFor)
    .from('walks')
    .where('id', req.query.walkID)
    .then(result => {
      res.status(200).send(result[0]);
    });
};


module.exports.calculateAverageRating = function(req, res) {
  knex.select('rating_' + req.body.ratingFor) //rating_walker
    .from('walks')
    .where(req.body.ratingFor + '_id', req.body.ratingForID)
    .andWhereNot('rating_' + req.body.ratingFor, null) // rating_walker
    .then(result => {
      var sum = 0;
      result.forEach(function(rating) {
        sum += rating['rating_' + req.body.ratingFor]; // rating_walker
      });
      var average = sum / result.length;
      console.log(' the average is ', average);
      return average;
    })
    .then(average => {
      if (req.body.ratingFor === 'walker') {
        return knex('profiles')
          .where('id', req.body.ratingForID)
          .update('avg_walker_rating', average);
      } else if (req.body.ratingFor === 'dog') {
        return knex('dogs')
          .where('id', req.body.ratingForID)
          .update('avg_rating', average);
      }
    })
    .then((result) => {
      console.log('succssfully saved average to the db');
      res.send(200);
    })
    .catch(() => {
      res.send(500);
    });
};

module.exports.writeMessages = function(req, res) {
  knex('messages').insert({
    owner_id: req.body.owner_id,
    walker_id: req.body.walker_id,
    text: req.body.text,
  })
    .then(res.send(200));
};

module.exports.fetchMessages = function(req, res) {
  knex.select()
    .from('messages')
    .where({send_id: req.body.id})
    .then((messages) => { res.status(200).send(messages); });
};

