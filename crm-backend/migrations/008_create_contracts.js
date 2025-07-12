exports.up = function(knex) {
  return knex.schema.createTable('contracts', function(table) {
    table.uuid('id').primary();
    table.uuid('clientId').references('id').inTable('clients').onDelete('SET NULL');
    table.uuid('projectId').references('id').inTable('projects').onDelete('SET NULL');
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.string('templateId');
    table.enu('status', ['draft', 'sent', 'signed', 'expired', 'cancelled']).notNullable();
    table.date('sentDate');
    table.date('signedDate');
    table.date('expiryDate');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('contracts');
};
