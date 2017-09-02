
exports.up = function (knex, Promise) {
  return Promise.all([
    // knex.schema.createTableIfNotExists('profiles', function (table) {
    //   table.increments('id').unsigned().primary();
    //   table.string('first', 100).nullable();
    //   table.string('last', 100).nullable();
    //   table.string('display', 100).nullable();
    //   table.string('email', 100).nullable();
    //   table.string('phone', 100).nullable();
    //   table.timestamps(true, true);
    // }),

    knex.schema.table('profiles', function (table) {
      table.string('profile_pic', 200).nullable();
      table.string('venmo', 50).unique();
      table.string('about_me', 500).nullable();
      table.boolean('walker').defaultTo(false);
      table.boolean('owner').defaultTo(false);
      table.decimal('avg_walker_rating').nullable();
    }),
    knex.schema.createTableIfNotExists('dogs', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name', 20).notNullable();
      table.integer('age').notNullable();
      table.integer('weight').notNullable();
      table.string('profile_pic', 200).nullable();
      table.string('breed', 100).nullable();
      table.string('extras', 500).nullable();
      table.decimal('avg_rating').nullable();
      table.integer('owner_id').notNullable();
      table.foreign('owner_id').references('profiles.id'); //foreign key
    }),
    knex.schema.createTableIfNotExists('walks', function(table) {
      table.increments('id').unsigned().primary();
      table.string('walk_zone_pt', 100).nullable();
      table.string('pickup_address', 200).nullable();
      table.string('walk_zone_radius', 100).defaultTo('1');
      table.decimal('price');
      table.dateTime('session_start');
      table.dateTime('session_end');
      table.dateTime('walk_start');
      table.dateTime('walk_end');
      table.integer('rating_walker');
      table.integer('rating_dog');
      table.integer('owner_id');
      table.foreign('owner_id').references('profiles.id'); //foreign key
      table.integer('walker_id').notNullable();
      table.foreign('walker_id').references('profiles.id'); //foreign key
      table.integer('dog_id');
      table.foreign('dog_id').references('dogs.id'); //foreign key

    }),
    //knex.schema.cascade().dropTable('profiles')
    //knex.raw('DROP TABLE profiles CASCADE')
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('walks'),
    knex.schema.dropTable('dogs'),
    knex.schema.createTableIfNotExists('profiles', function(table) {

    })
  ]);
};
