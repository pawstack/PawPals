const db = require('../');

const Dog = db.Model.extend({
  tableName: 'dogs'
});

module.exports = db.model('Dog', Dog)
