exports.up = function(knex) {
  return knex.schema.createTable('projects', function(table) {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.uuid('clientId').references('id').inTable('clients').onDelete('SET NULL');
    table.enu('status', ['planning', 'active', 'on-hold', 'completed', 'cancelled']).notNullable();
    table.enu('priority', ['low', 'medium', 'high', 'urgent']).notNullable();
    table.date('startDate').notNullable();
    table.date('endDate');
    table.decimal('budget');
    table.specificType('team', 'uuid[]');
    table.integer('progress').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
