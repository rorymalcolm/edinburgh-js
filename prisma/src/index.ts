import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  seedDb();
  const talk = await prisma.talk.findFirst();
  if (!talk) {
    throw new Error("No talks found");
  }
  // the data we receive back from Prisma is typed correctly
  console.log(talk.title);
  // but we can still do whatever we want with it
  console.log(talk.title.toUpperCase());
  const spongebobifiedTitle = spongebobify(talk.title);
  console.log(spongebobifiedTitle);
}

function spongebobify(input: string): string {
  return input
    .split("")
    .map((char, index) => {
      if (index % 2 === 0) {
        return char.toUpperCase();
      }
      return char.toLowerCase();
    })
    .join("");
}

async function seedDb() {
  const event = await prisma.events.create({
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
  await prisma.talk.create({
    data: {
      title: "Full Stack Type Safety!",
      abstract:
        "A talk about how to use TypeScript to ensure type safety across your entire stack",
      eventId: event.id,
      speakerId: speaker.id,
    },
  });
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
