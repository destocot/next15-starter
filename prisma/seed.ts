import { PrismaClient } from "@prisma/client";
import { hash } from "@node-rs/argon2";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
}

const main = async () => {
  const hashedPassword = await hashPassword("password");

  await prisma.user.create({
    data: {
      email: "testing@example.com",
      name: "testing",
      password: hashedPassword,
      posts: {
        createMany: {
          data: Array.from({ length: 12 }, () => ({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
          })),
        },
      },
    },
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
