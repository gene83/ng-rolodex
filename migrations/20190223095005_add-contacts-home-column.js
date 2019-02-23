exports.up = function(knex, Promise) {
  return knex.schema.alterTable('contacts', table => {
    table.string('home');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('contacts', table => {
    table.dropColumn('home');
  });
};
