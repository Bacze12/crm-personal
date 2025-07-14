import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed usuarios
  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@crm.com',
        role: 'admin',
        avatar: null,
        password: '$2b$10$D7Fhcin76otqctHmgYYRu.SAmesDsA87smuQSU4Bl6b55f0Nj0puy', // hash de 'admin123'
      },
      {
        name: 'Staff',
        email: 'staff@crm.com',
        role: 'staff',
        avatar: null,
        password: '$2b$10$D7Fhcin76otqctHmgYYRu.SAmesDsA87smuQSU4Bl6b55f0Nj0puy',
      },
    ],
    skipDuplicates: true,
  });

  // Seed clientes
  await prisma.client.createMany({
    data: [
      {
        name: 'Cliente 1',
        email: 'cliente1@crm.com',
        phone: '123456789',
        address: 'Calle 1',
      },
      {
        name: 'Cliente 2',
        email: 'cliente2@crm.com',
        phone: '987654321',
        address: 'Calle 2',
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
