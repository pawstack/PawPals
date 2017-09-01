
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('profiles')
  ]);
};

exports.down = function(knex, Promise) {
  knex.schema.createTableIfNotExists('profiles', function(table) {

  });
};
