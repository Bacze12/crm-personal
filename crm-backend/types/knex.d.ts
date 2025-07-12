// Tipos de tablas para Knex
import { User, Client, Project, Task, TimeEntry, Invoice, InvoiceItem, Contract, KnowledgeBase, Block, DatabaseField, DatabaseRecord } from '../../frontend/src/types';

// Extiende la interfaz de Knex para tipar las tablas

declare module 'knex/types/tables' {
  interface Tables {
    users: User;
    clients: Client;
    projects: Project;
    tasks: Task;
    time_entries: TimeEntry;
    invoices: Invoice;
    invoice_items: InvoiceItem;
    contracts: Contract;
    knowledge_bases: KnowledgeBase;
    blocks: Block;
    database_fields: DatabaseField;
    database_records: DatabaseRecord;
  }
}
