const Promise = require('bluebird');
const profiles = require('./data/sample_users');
const dogs = require('./data/sample_dogs');

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
      owner: profile.owner,
      stripe_user_id: profile.stripe_user_id,
      customer_id_cc_Token: profile.customer_id_cc_Token
    })
    .tap((userIds) => {
      return knex('auths')
        .insert({
          id: userIds[0],
          type: 'google',
          oauth_id: userIds[0],
          profile_id: userIds[0]
        });
    })
    .then((userIds) => {
      let dog = dogs[userIds[0]];
      return knex('dogs')
        .insert({
          id: userIds[0],
          name: dog.name,
          age: dog.age,
          weight: dog.weight,
          breed: dog.breed,
          profile_pic: dog.profile_pic,
          extras: dog.extras,
          avg_rating: dog.avg_rating,
          owner_id: userIds[0]
        });
    });
};
