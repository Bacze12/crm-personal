export class ClientDTO {
  id?: string; // Optional for create operations
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  notes?: string;

  constructor(data: { name: string; email: string; phone?: string; address?: string; company?: string; notes?: string; id?: string }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.company = data.company;
    this.notes = data.notes;
  }
}
export class ClientUpdateDTO {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
  notes?: string;

  constructor(data: { name?: string; email?: string; phone?: string; address?: string; company?: string; notes?: string }) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.company = data.company;
    this.notes = data.notes;
  }
}