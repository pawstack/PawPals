const Promise = require('bluebird');
const walks = require('./data/sample_walks');

exports.seed = function(knex, Promise) {
  let promises = [];
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
