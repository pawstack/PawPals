const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));
const db = require('bookshelf')(knex);

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.saveStripeUserID = function(userID, stripeUserID) {
  return knex('profiles')
    .where({email: userID})
    .update({stripe_user_id: stripeUserID})
    .then(function(result) {
      if (result === 0) { //id does not exist.  no update made.
        throw result;
      }
    })
    .catch(function(err) {
      console.log('error updating db with stripe data - id does not exist', err);
    });
};

module.exports.saveTokenizedCC = function(userID, token) {
  return knex('profiles')
    .where({email: userID})
    .update({customer_id_cc_Token: token})
    .then(function(result) {
      if (result === 0) { //id does not exist.  no update made.
        throw result;
      }
    })
    .catch(function(err) {
      console.log('error updating db with tokenized cc data - email does not exist', err);
    });
};

module.exports.getStripeID = function(userID) {
  return knex('profiles')
    .select('stripe_user_id')
    .where({id: userID})
    .then((result) => {
      console.log(' db retrieved the stripe ID of ', userID, ' is ', result[0].stripe_user_id);
      return result[0].stripe_user_id;
    });
};

module.exports.getCCToken = function(userID) {
  return knex('profiles')
    .select('customer_id_cc_Token')
    .where({id: userID})
    .then((result) => {
      console.log(' db retrieved the CC Token of userID ', userID, ' is ', result[0].customer_id_cc_Token);
      return result[0].customer_id_cc_Token;
    });
};



// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
