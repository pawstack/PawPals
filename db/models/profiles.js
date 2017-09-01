const db = require('../');

const Profile = db.Model.extend({
  tableName: 'users',
  auths: function() {
    return this.hasMany('Auth');
  }
});

module.exports = db.model('Profile', Profile);
