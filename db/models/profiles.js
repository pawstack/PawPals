const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  dogs: function() {
    return this.hasOne('Dog');
  },
  walks: function() {
    return this.hasMany('Walk');
  }
});

module.exports = db.model('Profile', Profile);
