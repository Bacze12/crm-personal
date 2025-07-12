exports.up = function(knex) {
  return knex.schema.createTable('invoices', function(table) {
    table.uuid('id').primary();
    table.uuid('clientId').references('id').inTable('clients').onDelete('SET NULL');
    table.uuid('projectId').references('id').inTable('projects').onDelete('SET NULL');
    table.string('invoiceNumber').notNullable();
    table.decimal('subtotal').notNullable();
    table.decimal('tax').notNullable();
    table.decimal('total').notNullable();
    table.enu('status', ['draft', 'sent', 'paid', 'overdue', 'cancelled']).notNullable();
    table.date('issueDate').notNullable();
    table.date('dueDate').notNullable();
    table.text('notes');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('invoices');
};
