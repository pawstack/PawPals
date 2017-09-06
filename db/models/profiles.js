const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  walks: function() {
    return this.hasMany('Walk');
  }
});

module.exports = db.model('Profile', Profile);
