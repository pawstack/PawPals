const Promise = require('bluebird');
const profiles = require('./data/sample_users');

exports.seed = function (knex, Promise) {
  let promises = [];
  profiles.forEach((profile) => {
    promises.push(createProfile(knex, profile));
  });

  return Promise.all(promises);
};

const createProfile = (knex, profile) => {
  return knex('profiles')
    .returning('id')
    .insert({
      first: profile.first,
      last: profile.last,
      display: profile.display,
      email: profile.email,
      phone: profile.phone,
      profile_pic: profile.profile_pic,
      about_me: profile.about_me,
      avg_walker_rating: profile.avg_walker_rating,
      address: profile.address,
      walker: profile.walker,
      owner: profile.owner
    })
    .then((userIds) => {
      return knex('auths')
        .insert({
          type: 'google',
          oauth_id: userIds[0],
          profile_id: userIds[0]
        });
    });
};
