const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  dog: function() {
    return this.hasMany('Dog', 'owner_id');
  },
  walker: function() {
    return this.hasMany('Walk', 'walker_id');
  },
  owner: function() {
    return this.hasMany('Walk', 'owner_id');
  }
});

module.exports = db.model('Profile', Profile);

