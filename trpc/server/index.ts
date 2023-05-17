import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

import { z } from "zod";

const appRouter = router({
  userList: publicProcedure.query(async () => {
    return [
      {
        id: "1",
        name: "Rory",
      },
    ];
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    return {
      id: input,
      name: "Rory",
    };
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return {
        id: "1",
        name: input.name,
      };
    }),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);

export type AppRouter = typeof appRouter;
