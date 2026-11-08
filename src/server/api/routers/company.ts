import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getSampleCompany,
  listSampleCompanies,
} from "~/server/sample-data/companies";

export const companyRouter = createTRPCRouter({
  catalog: publicProcedure.query(() => {
    return listSampleCompanies();
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const company = await ctx.db.projectCompany.findUnique({
        where: { id: input.id },
        include: {
          project: true,
          extracts: { orderBy: { version: "asc" } },
        },
      });

      if (!company) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Company not found",
        });
      }

      return company;
    }),

  addToProject: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        companyNumber: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      const sample = getSampleCompany(input.companyNumber);
      if (!sample) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unknown company number — not in sample catalog",
        });
      }

      const existing = await ctx.db.projectCompany.findUnique({
        where: {
          projectId_companyNumber: {
            projectId: input.projectId,
            companyNumber: input.companyNumber,
          },
        },
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Company already in this project",
        });
      }

      return ctx.db.projectCompany.create({
        data: {
          projectId: input.projectId,
          companyNumber: sample.companyNumber,
          name: sample.name,
          companyType: sample.companyType,
          registeredIn: sample.registeredIn,
          registeredAt: sample.registeredAt,
          status: sample.status,
        },
      });
    }),
});
