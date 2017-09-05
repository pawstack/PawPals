const db = require('../');

const Walk = db.Model.extend({
  tableName: 'walks'
});

module.exports = db.model('Walk', Walk);
