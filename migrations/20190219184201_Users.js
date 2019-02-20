exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table
      .string('username')
      .notNullable()
      .unique();
    table.timestamps(true, true);
    table.string('name');
    table.string('email');
    table.string('address');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
