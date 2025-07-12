exports.up = function(knex) {
  return knex.schema.createTable('database_records', function(table) {
    table.uuid('id').primary();
    table.uuid('databaseId').references('id').inTable('knowledge_bases').onDelete('CASCADE');
    table.jsonb('properties').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('database_records');
};
