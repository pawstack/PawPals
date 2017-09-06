const models = require('../../db/models');
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
  models.Walk.fetchAll({
    walker_id: req.user.id
  })
    .then(data => {
      var response = {};
      var walks = [];
      for (var i = 0; i < data.models.length; i++) {
        walks.push(data.models[i].attributes);
      }
      response['walks'] = walks;
      console.log(req.user.address, 'address');
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
    walker_id: req.user.id
  })
    .save()
    .then((model) => {
      return models.Walk.fetchAll({
        walker_id: req.user.id
      });
    })
    .then(data => {
      var walks = [];
      for (var i = 0; i < data.models.length; i++) {
        walks.push(data.models[i].attributes);
      }
      res.status(201).send(walks);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};


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



