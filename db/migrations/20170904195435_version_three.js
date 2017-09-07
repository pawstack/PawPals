
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
      table.dropColumn('venmo');
      table.string('stripe_user_id', 200).nullable();
      table.string('customer_id_cc_Token', 200).nullable();
    }),
    knex.schema.table('walks', function(table) {
      table.boolean('paid').defaultTo(false);
      table.string('payment_transaction_id', 200).nullable();
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
      table.dropColumn('venmo');
      table.dropColumn('stripe_user_id');
      table.dropColumn('customer_id_cc_Token');
    }),
    knex.schema.table('walks', function(table) {
      table.dropColumn('paid');
      table.dropColumn('payment_transaction_id');
    })
  ]);
};
