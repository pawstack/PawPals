const db = require('../');

const Dog = db.Model.extend({
  tableName: 'dogs',
  profile: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Dog', Dog);
