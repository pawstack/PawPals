exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('walks', function(table) {
      table.dateTime('session_start_walker');
      table.dateTime('session_end_walker');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('walks', function(table) {
      table.dropColumn('session_start_walker');
      table.dropColumn('session_end_walker');
    })
  ])
};
