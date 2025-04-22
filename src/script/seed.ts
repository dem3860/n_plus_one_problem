import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  console.log("🔁 Seeding users and posts...");

  for (let i = 0; i < 2000; i++) {
    await prisma.user.create({
      data: {
        name: `User ${i + 1}`,
        posts: {
          create: Array.from({ length: 5 }, (_, j) => ({
            title: `Post ${j + 1} of User ${i + 1}`,
          })),
        },
      },
    });

    if ((i + 1) % 100 === 0) {
      console.log(`✅ Created ${i + 1} users`);
    }
  }

  console.log("🎉 Seeding completed.");
};

const main = async () => {
  try {
    await seed();
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
