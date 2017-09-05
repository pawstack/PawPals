const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Walk.fetchAll({
    walker_id: req.query.walker_id
  })
    .then(data => {
      var response = {};
      var walks = [];
      for (var i = 0; i < data.models.length; i++) {
        walks.push(data.models[i].attributes);
      }
      response['walks'] = walks;
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
      })
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
