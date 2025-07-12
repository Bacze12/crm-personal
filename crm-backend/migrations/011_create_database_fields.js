exports.up = function(knex) {
  return knex.schema.createTable('database_fields', function(table) {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.enu('type', ['text', 'number', 'date', 'select', 'multiselect', 'checkbox', 'relation']).notNullable();
    table.specificType('options', 'text[]');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('database_fields');
};
