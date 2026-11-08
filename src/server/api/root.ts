import { companyRouter } from "~/server/api/routers/company";
import { extractRouter } from "~/server/api/routers/extract";
import { projectRouter } from "~/server/api/routers/project";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  project: projectRouter,
  company: companyRouter,
  extract: extractRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
