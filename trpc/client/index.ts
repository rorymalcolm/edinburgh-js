import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

async function main() {
  const user = await trpc.userCreate.mutate({
    name: "Rory",
  });
  const userFetched = await trpc.userById.query(user.id);
  console.log(
    `Do we have the same user name? ${
      user.name === userFetched.name ? "Yes!" : "No :("
    }`
  );
}
