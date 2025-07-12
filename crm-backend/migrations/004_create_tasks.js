exports.up = function(knex) {
  return knex.schema.createTable('tasks', function(table) {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.uuid('projectId').references('id').inTable('projects').onDelete('CASCADE');
    table.uuid('assigneeId').references('id').inTable('users').onDelete('SET NULL');
    table.enu('status', ['todo', 'in-progress', 'review', 'done']).notNullable();
    table.enu('priority', ['low', 'medium', 'high', 'urgent']).notNullable();
    table.date('dueDate');
    table.decimal('estimatedHours');
    table.decimal('actualHours');
    table.specificType('tags', 'text[]');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
