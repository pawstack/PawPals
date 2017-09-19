
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(t) {
    t.increments('id').unsigned().primary();
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').nullable();
    t.dateTime('deletedAt').nullable();
    t.string('text', 200).nullable();
    t.integer('owner_id').notNullable();
    t.foreign('owner_id').references('profiles.id').onDelete('CASCADE');
    t.integer('walker_id').notNullable();
    t.foreign('walker_id').references('profiles.id').onDelete('CASCADE');
    t.integer('sender_id').notNullable();
    t.foreign('sender_id').references('profiles.id').onDelete('CASCADE');

    t.boolean('owner_read').defaultTo(false);
    t.boolean('walker_read').defaultTo(false);

    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
