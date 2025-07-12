exports.up = function(knex) {
  return knex.schema.createTable('clients', function(table) {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('phone');
    table.string('company').notNullable();
    table.string('address');
    table.text('notes');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('clients');
};
