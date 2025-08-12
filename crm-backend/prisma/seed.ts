import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el proceso de seeding...');

  // 1. Seed de los estados de tarea
  const taskStatuses = await prisma.taskStatus.createMany({
    data: [
      { name: 'To Do', color: '#ff6961', order: 1 },
      { name: 'In Progress', color: '#fdfd96', order: 2 },
      { name: 'Completed', color: '#77dd77', order: 3 },
    ],
    skipDuplicates: true,
  });
  console.log(`Creados ${taskStatuses.count} estados de tarea.`);

  // Obtenemos los IDs de los estados de tarea creados
  const todoStatus = await prisma.taskStatus.findUnique({ where: { name: 'To Do' } });
  const inProgressStatus = await prisma.taskStatus.findUnique({ where: { name: 'In Progress' } });
  const completedStatus = await prisma.taskStatus.findUnique({ where: { name: 'Completed' } });

  // 2. Seed de usuarios
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@crm.com',
      role: 'admin',
      password: '$2b$10$D7Fhcin76otqctHmgYYRu.SAmesDsA87smuQSU4Bl6b55f0Nj0puy', // hash de 'admin123'
    },
  }).catch(() => null); // Si el usuario ya existe, no hace nada

  const staffUser = await prisma.user.create({
    data: {
      name: 'Staff',
      email: 'staff@crm.com',
      role: 'staff',
      password: '$2b$10$D7Fhcin76otqctHmgYYRu.SAmesDsA87smuQSU4Bl6b55f0Nj0puy',
    },
  }).catch(() => null);

  if (adminUser) console.log('Usuario Admin creado.');
  if (staffUser) console.log('Usuario Staff creado.');

  // 3. Seed de clientes
  const client1 = await prisma.client.create({
    data: {
      name: 'Innovate Solutions Inc.',
      email: 'contact@innovate.com',
      phone: '555-1234',
      company: 'Innovate Solutions',
    },
  }).catch(() => null);

  const client2 = await prisma.client.create({
    data: {
      name: 'Global Ventures LLC',
      email: 'info@globalventures.com',
      phone: '555-5678',
      company: 'Global Ventures',
    },
  }).catch(() => null);

  if (client1) console.log('Cliente 1 creado.');
  if (client2) console.log('Cliente 2 creado.');

  // Si los usuarios y clientes se crearon, procedemos a crear proyectos y tareas
  if (client1 && client2 && staffUser && todoStatus && inProgressStatus && completedStatus) {

    // 4. Seed de proyectos
    const project1 = await prisma.project.create({
      data: {
        name: 'Rediseño de sitio web',
        description: 'Proyecto para actualizar el diseño y la experiencia de usuario del sitio web principal.',
        clientId: client1.id,
        status: 'active',
        priority: 'high',
        startDate: new Date('2025-08-01'),
        progress: 30,
        team: ['Alice', 'Bob'],
      },
    });
    console.log(`Proyecto "${project1.name}" creado.`);

    const project2 = await prisma.project.create({
      data: {
        name: 'Campaña de marketing digital',
        description: 'Lanzamiento de una nueva campaña publicitaria en redes sociales y correo electrónico.',
        clientId: client2.id,
        status: 'on_hold',
        priority: 'medium',
        startDate: new Date('2025-07-20'),
        progress: 10,
        team: ['Charlie'],
      },
    });
    console.log(`Proyecto "${project2.name}" creado.`);

    // 5. Seed de tareas
    await prisma.task.createMany({
      data: [
        {
          name: 'Investigación de mercado',
          description: 'Analizar las tendencias actuales y la competencia.',
          projectId: project1.id,
          statusId: todoStatus.id,
          priority: 'medium',
          assigneeId: staffUser.id,
        },
        {
          name: 'Diseñar wireframes',
          description: 'Crear los esquemas visuales de las nuevas páginas.',
          projectId: project1.id,
          statusId: inProgressStatus.id,
          priority: 'high',
          assigneeId: staffUser.id,
        },
        {
          name: 'Crear contenido para redes',
          description: 'Redactar los textos y seleccionar las imágenes para la campaña.',
          projectId: project2.id,
          statusId: todoStatus.id,
          priority: 'low',
          assigneeId: staffUser.id,
        },
        {
          name: 'Configurar anuncios en Facebook',
          description: 'Crear y segmentar los anuncios de la campaña en Facebook Ads.',
          projectId: project2.id,
          statusId: completedStatus.id,
          priority: 'urgent',
          assigneeId: staffUser.id,
        },
      ],
      skipDuplicates: true,
    });
    console.log('Tareas de ejemplo creadas y asignadas.');
  }

  console.log('Proceso de seeding finalizado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });