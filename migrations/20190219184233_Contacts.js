exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', table => {
    table.increments();
    table.string('name').notNullable();
    table.timestamps(true, true);
    table.string('address');
    table.string('mobile');
    table.string('work');
    table.string('email');
    table.string('twitter');
    table.string('instagram');
    table.string('github');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contacts');
};
