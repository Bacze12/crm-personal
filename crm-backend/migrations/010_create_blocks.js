exports.up = function(knex) {
  return knex.schema.createTable('blocks', function(table) {
    table.uuid('id').primary();
    table.enu('type', ['paragraph', 'heading', 'list', 'code', 'image', 'database']).notNullable();
    table.text('content').notNullable();
    table.jsonb('properties');
    table.jsonb('children');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('blocks');
};
