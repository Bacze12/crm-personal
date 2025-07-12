exports.up = function(knex) {
  return knex.schema.createTable('invoice_items', function(table) {
    table.uuid('id').primary();
    table.uuid('invoiceId').references('id').inTable('invoices').onDelete('CASCADE');
    table.string('description').notNullable();
    table.integer('quantity').notNullable();
    table.decimal('rate').notNullable();
    table.decimal('total').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('invoice_items');
};
