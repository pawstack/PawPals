const Promise = require('bluebird');

exports.seed = function (knex, Promise) {
  var promises = [];
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

const profiles = [
  {
    first: 'Paw',
    last: 'Walker',
    display: 'Paw Walker',
    email: 'pawstack+pawwalker@gmail.com',
    phone: '(415) 268-0355',
    profile_pic: 'https://yt3.ggpht.com/-_fExgATRXLY/AAAAAAAAAAI/AAAAAAAAAAA/-fmo8LhN7Pg/s240-c-k-no-rj-c0xffffff/photo.jpg',
    about_me: 'I walk my dogs a quarter mile at a time.',
    avg_walker_rating: '4.7',
    address: '944 Market St, San Francisco, CA 94102',
    walker: true,
    owner: true
  },
  {
    first: 'Vin',
    last: 'Beagle',
    display: 'Vin Beagle',
    email: 'pawstack+vinbeagle@gmail.com',
    phone: '(415) 268-0355',
    profile_pic: 'https://yt3.ggpht.com/-_fExgATRXLY/AAAAAAAAAAI/AAAAAAAAAAA/-fmo8LhN7Pg/s240-c-k-no-rj-c0xffffff/photo.jpg',
    about_me: 'I don\'t have friends, I have dogs.',
    avg_walker_rating: '4.3',
    address: '611 Mission St, San Francisco, CA 94105',
    walker: true,
    owner: true
  },
  {
    first: 'Michelle',
    last: 'Ruffriguez',
    display: 'Michelle Ruffriguez',
    email: 'pawstack+michelleruffriguez@gmail.com',
    phone: '(415) 268-0355',
    profile_pic: 'https://yt3.ggpht.com/-_fExgATRXLY/AAAAAAAAAAI/AAAAAAAAAAA/-fmo8LhN7Pg/s240-c-k-no-rj-c0xffffff/photo.jpg',
    about_me: 'Dog walking\'s simple. You make choices and you don’t look back.',
    avg_walker_rating: '4.9',
    address: '1700 Mission St, San Francisco, CA 94103',
    walker: true,
    owner: true
  }
];
