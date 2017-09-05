const Promise = require('bluebird');

exports.seed = function(knex, Promise) {
  var promises = [];
  walks.forEach((walk) => {
    promises.push(createWalk(knex, walk));
  });

  return Promise.all(promises);
};

const createWalk = (knex, walk) => {
  return knex('walks')
    .insert({
      walk_zone_pt: walk.walk_zone_pt,
      walk_zone_radius: walk.walk_zone_radius,
      price: walk.price,
      session_start: walk.session_start,
      session_end: walk.session_end,
      walker_id: walk.walker_id,
    });
};

const today = new Date();
today.setHours(0, 0, 0, 0);
const millisecondsPerHour = 3600000;

walks = [
  {
    walk_zone_pt: '944 Market St, San Francisco, CA 94102',
    walk_zone_radius: 3,
    price: 40,
    session_start: new Date(today.getTime() + 10 * millisecondsPerHour),
    session_end: new Date(today.getTime() + 12 * millisecondsPerHour),
    walker_id: 1,
  },
  {
    walk_zone_pt: '611 Mission St, San Francisco, CA 94105',
    walk_zone_radius: 3,
    price: 45,
    session_start: new Date(today.getTime() + 11 * millisecondsPerHour),
    session_end: new Date(today.getTime() + 13 * millisecondsPerHour),
    walker_id: 2
  },
  {
    walk_zone_pt: '1700 Mission St, San Francisco, CA 94103',
    walk_zone_radius: 3,
    price: 30,
    session_start: new Date(today.getTime() + 14 * millisecondsPerHour),
    session_end: new Date(today.getTime() + 16 * millisecondsPerHour),
    walker_id: 3
  }
];
