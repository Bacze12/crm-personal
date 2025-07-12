exports.up = function(knex) {
  return knex.schema.createTable('time_entries', function(table) {
    table.uuid('id').primary();
    table.uuid('userId').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('taskId').references('id').inTable('tasks').onDelete('CASCADE');
    table.uuid('projectId').references('id').inTable('projects').onDelete('CASCADE');
    table.text('description').notNullable();
    table.decimal('hours').notNullable();
    table.date('date').notNullable();
    table.boolean('billable').notNullable();
    table.decimal('hourlyRate');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('time_entries');
};
