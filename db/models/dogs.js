const db = require('../');

const Dog = db.Model.extend({
  tableName: 'dogs',
  walk: function() {
    return this.hasMany('Walk', 'dog_id');
  },
  owner: function() {
    return this.belongsTo('Profile', 'owner_id');
  }
});

module.exports = db.model('Dog', Dog);
