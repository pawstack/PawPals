exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('walks', function(table) {
      table.string('longitude', 100).nullable();
      table.string('latitude', 100).nullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('walks', function(table) {
      table.dropColumn('longitude');
      table.dropColumn('latitude');
    })
  ]);
};
