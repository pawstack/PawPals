const db = require('../');

const Walk = db.Model.extend({
  tableName: 'walks',
  profiles: function() {
    return this.belongsToMany('Profile');
  }
});

module.exports = db.model('Walk', Walk);
