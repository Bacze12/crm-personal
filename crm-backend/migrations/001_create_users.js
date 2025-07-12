exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.enu('role', ['admin', 'staff', 'client']).notNullable();
    table.string('avatar');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
