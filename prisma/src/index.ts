import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const edinburghJs = await prisma.events.create({
    data: {
      name: "EdinburghJS",
      description: "Edinburgh's monthly meetup for JavaScript developers",
      date: new Date("2023-05-17T19:00:00.000Z"),
      location: "CodeClan",
    },
  });
  const speaker = await prisma.speaker.create({
    data: {
      name: "Rory Malcolm",
      bio: "Rory is a software engineer giving his first talk at EdinburghJS",
    },
  });
  const talk = await prisma.talk.create({
    data: {
      title: "Full Stack Type Safety!",
      abstract:
        "A talk about how to use TypeScript to ensure type safety across your entire stack",
      eventId: edinburghJs.id,
      speakerId: speaker.id,
    },
  });
  console.log(
    `${talk.title} by ${speaker.name} on ${edinburghJs.date} created!`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
