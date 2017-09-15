const db = require('../');

const Message = db.Model.extend({
  tableName: 'messages',
  walker: function() {
    return this.belongsTo('Profile', 'walker_id');
  },
  owner: function() {
    return this.belongsTo('Profile', 'owner_id');
  },
  sender: function() {
    return this.belongsTo('Profile', 'sender_id');
  },
});

module.exports = db.model('Message', Message);

