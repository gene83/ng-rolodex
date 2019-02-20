exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('contacts').insert([
        { id: 1, name: 'tyler', created_by: 1 },
        { id: 2, name: 'zeke', created_by: 1 },
        { id: 3, name: 'eunice', created_by: 1 },
        { id: 4, name: 'jason', created_by: 2 },
        { id: 5, name: 'ed', created_by: 2 },
        { id: 6, name: 'jay', created_by: 3 }
      ]);
    });
};
