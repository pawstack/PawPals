const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));
const db = require('bookshelf')(knex);
var curl = require('curlrequest');
var stripe = require('stripe')('sk_test_2slmpAIrhlZSnWP7KSMNp6HX');
var controllers = require('./');
const knex = require('knex')(require('../../knexfile'));
const db = require('bookshelf')(knex);

db.plugin('registry');

module.exports.getFilteredWalks = (req, res) => {
  var filters = req.body;
  // Initialize default search parameters
  filters.minDate = new Date(filters.minDate);
  filters.location = !!filters.location ? filters.location : req.user.address;
  filters.startDate = new Date(filters.startDate);
  filters.endDate = new Date(filters.endDate);
  filters.duration = !!filters.duration ? filters.duration : 30;
  filters.pickUpTime = !!filters.pickupTime ? filters.pickupTime.getTime() - filters.pickupTime.setHours(0, 0, 0, 0) : filters.pickupTime;

  models.Walk
    .query((qb) => {
      qb.where('price', '<=', filters.price)
        .whereBetween('session_start', [filters.startDate, filters.endDate])
        .whereBetween('session_end', [filters.startDate, filters.endDate]);
    })
    .fetchAll()
    .then(walks => {
      res.status(200).send(walks);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      console.log('****** getFilteredWalks error ', err);
      res.status(503).send(err);
    });
};


module.exports.getAll = (req, res) => {
  models.Walk
    .fetchAll({walker_id: req.user.id})
    .then((collection) => {
      collection.fetch({withRelated: ['owner', 'dog']})
        .then((join) => {
          var response = {};
          var walks = [];
          for (var i = 0; i < join.models.length; i++) {
            walks.push(join.models[i]);
          }
          response['walks'] = walks;
          response['location'] = req.user.address;
          res.status(200).send(response);
        })
        .catch(err => {
          res.status(503).send(err);
        });
    });
}

module.exports.create = (req, res) => {
  models.Walk.forge({
    session_start: req.body.session_start,
    session_end: req.body.session_end,
    walk_zone_pt: req.body.walk_zone_pt,
    price: req.body.price,
    walker_id: req.user.id
  })
    .save()
    .then(() => {
      models.Walk
        .fetchAll({walker_id: req.user.id})
        .then((collection) => {
          collection.fetch({withRelated: ['owner', 'dog']})
            .then((join) => {
              var response = {};
              var walks = [];
              for (var i = 0; i < join.models.length; i++) {
                walks.push(join.models[i]);
              }
              response['walks'] = walks;
              response['location'] = req.user.address;
              res.status(200).send(response);
            })
            .catch(err => {
              res.status(503).send(err);
            });
        });
    });
};

module.exports.destroy = (req, res) => {
  new models.Walk({id: req.body.walk_id})
    .destroy()
    .then(() => {
      models.Walk
        .fetchAll({walker_id: req.user.id})
        .then((collection) => {
          collection.fetch({withRelated: ['owner', 'dog']})
            .then((join) => {
              var response = {};
              var walks = [];
              for (var i = 0; i < join.models.length; i++) {
                walks.push(join.models[i]);
              }
              response['walks'] = walks;
              response['location'] = req.user.address;
              res.status(200).send(response);
            })
            .catch(err => {
              res.status(503).send(err);
            });
        });
    });
}


module.exports.saveDog = (req, res) => {

  var dogToDB = new Promise(
    (resolve, reject) => {
      knex('dogs').insert({
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
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

  knex('profiles').where('id', req.user.id).update({ about_me: req.body.extras,
    walker: true,
    phone: req.body.phone,
    address: req.body.address
  })
    .then(res.send(200));
};

module.exports.getAndSaveStripeID = (req, res) => {
  console.log('*********** inside of controller of /signup/stripeid');
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
};

module.exports.getAndsaveCardToken = (req, res) => {
  console.log('******* INSIDE OF CONTORLLER SIGNUP/PAYMENT/SAVECARDTOKEN');
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
};


module.exports.processPayments = (req, res) => {
  controllers.Profiles.getCCToken(req.user.id)
    .then((tokenizedCC) => {
      controllers.Profiles.getStripeID(req.body.walkerUserID)
        .then((destinationStripeID) => {
          stripe.charges.create({
            amount: req.body.amount, // amount that the owner is charged
            description: req.body.description,
            currency: 'USD',
            customer: tokenizedCC, // retrieved from DB
            destination: {
              amount: req.body.amount * (1 - (req.body.percentRetainedByPlatform / 100)), // amount to be transferred to the destination account.t.
              account: destinationStripeID // Retrieved from db. This is the account where funds will be deposited.
            }
          })
            .then(charge => {
              console.log('the charge details are ', charge);
              if (charge.paid === true) {
                saveChargeTransactionToDB(req.body.walkID, charge.id);
              }
              res.redirect('/payment'); //update this later!!!
            });
        });
    });
};

var saveChargeTransactionToDB = (walkID, transactionNumber) => {
  return knex('walks')
    .where({id: walkID, paid: false})
    .update({
      paid: true,
      payment_transaction_id: transactionNumber
    })
    .then(result => {
      if (result === 0) {
        console.log('error saving charge transaction to DB');
      }
    });
};

var getTransactionID = (walkID) => {
  console.log('in get transaction id function');
  return knex('walks')
    .select('payment_transaction_id')
    .where({id: walkID, paid: true})
    .then(result => {
      if (result.length === 0) {
        console.log('error retireiving transaction id from db');
        throw result;
      } else {
        console.log('the resulting transaction id is ', result);
        return result.payment_transaction_id;
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
      payment_transaction_id: NULL
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
