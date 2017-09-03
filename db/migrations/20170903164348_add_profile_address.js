
exports.up = function (knex, Promise) {
  return knex.schema.table('profiles', function (table) {
    table.string('address', 200).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('profiles', function (table) {
    table.dropColumn('address');
  });
};
