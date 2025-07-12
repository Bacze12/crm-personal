exports.up = function(knex) {
  return knex.schema.createTable('knowledge_bases', function(table) {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.jsonb('content').notNullable();
    table.uuid('parentId').references('id').inTable('knowledge_bases').onDelete('SET NULL');
    table.enu('type', ['page', 'database']).notNullable();
    table.specificType('tags', 'text[]');
    table.uuid('createdBy').references('id').inTable('users').onDelete('SET NULL');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('knowledge_bases');
};
