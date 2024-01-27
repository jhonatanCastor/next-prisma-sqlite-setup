import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.users.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@admin.com",
      role: "admin",
      password: 'Jhon999',
      description: 'test',
    },
  });

  console.log({ user });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
