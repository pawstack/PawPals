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
  },
  message_walker: function() {
    return this.hasMany('Message', 'walker_id');
  },
  message_owner: function() {
    return this.hasMany('Message', 'owner_id');
  },
  sender: function() {
    return this.hasMany('Message', 'sender_id');
  }
});

module.exports = db.model('Profile', Profile);

