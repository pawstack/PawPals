const db = require('../');

const Walk = db.Model.extend({
  tableName: 'walks',
  profiles: function() {
    return this.belongsToMany('Profile');
  },
  dog: function() {
    return this.belongsTo('Dog');
  }
});

module.exports = db.model('Walk', Walk);
