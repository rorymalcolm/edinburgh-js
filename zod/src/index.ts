import { z } from "zod";
import { horridApiCall } from "./horrid-api";

const horridApiSchema = z.object({
  name: z.string(),
  mood: z.union([z.literal("nervous"), z.literal("confident")]),
  talkingFor: z.number().positive().gte(5),
});

async function main() {
  try {
    const apiCallResult = await horridApiCall();
    const result = horridApiSchema.parse(apiCallResult);
    // we can now use result.name, result.mood, result.talkingFor
    console.log(`Hello ${result.name}!`);
    console.log(`You seem ${result.mood}!`);
    console.log(`You've been talking for ${result.talkingFor} minutes!`);
  } catch (error) {
    console.log(error);
  }
}

main();
