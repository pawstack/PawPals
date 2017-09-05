const models = require('../../db/models');

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
