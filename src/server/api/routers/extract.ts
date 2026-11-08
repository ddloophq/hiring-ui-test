import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { serializeExtract } from "~/server/extracts";
import { extractOrdered, inngest } from "~/server/inngest/client";
import { EXTRACT_SETTLE_DELAY_MS } from "~/server/sample-data/companies";

export const extractRouter = createTRPCRouter({
  listByCompany: publicProcedure
    .input(z.object({ projectCompanyId: z.string() }))
    .query(async ({ ctx, input }) => {
      const company = await ctx.db.projectCompany.findUnique({
        where: { id: input.projectCompanyId },
      });

      if (!company) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Company not found",
        });
      }

      const extracts = await ctx.db.companyExtract.findMany({
        where: { projectCompanyId: input.projectCompanyId },
        orderBy: { version: "asc" },
      });

      return extracts.map(serializeExtract);
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const extract = await ctx.db.companyExtract.findUnique({
        where: { id: input.id },
        include: { projectCompany: true },
      });

      if (!extract) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Extract not found",
        });
      }

      return {
        ...serializeExtract(extract),
        projectCompany: extract.projectCompany,
      };
    }),

  order: publicProcedure
    .input(z.object({ projectCompanyId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const company = await ctx.db.projectCompany.findUnique({
        where: { id: input.projectCompanyId },
        include: {
          extracts: { orderBy: { version: "desc" }, take: 1 },
        },
      });

      if (!company) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Company not found",
        });
      }

      const pending = await ctx.db.companyExtract.findFirst({
        where: {
          projectCompanyId: input.projectCompanyId,
          status: "PENDING",
        },
      });

      if (pending) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An extract order is already pending for this company",
        });
      }

      const nextVersion = (company.extracts[0]?.version ?? 0) + 1;
      const settleAfter = new Date(Date.now() + EXTRACT_SETTLE_DELAY_MS);

      const created = await ctx.db.companyExtract.create({
        data: {
          projectCompanyId: input.projectCompanyId,
          version: nextVersion,
          status: "PENDING",
          settleAfter,
        },
      });

      try {
        await inngest.send(extractOrdered.create({ extractId: created.id }));
      } catch (error) {
        // Without the event nothing would ever settle this row, and a stuck
        // PENDING extract blocks further orders for the company.
        await ctx.db.companyExtract.delete({ where: { id: created.id } });
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not schedule the extract order",
          cause: error,
        });
      }

      return serializeExtract(created);
    }),

  compare: publicProcedure
    .input(
      z.object({
        projectCompanyId: z.string(),
        leftExtractId: z.string(),
        rightExtractId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.leftExtractId === input.rightExtractId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Select two different extracts to compare",
        });
      }

      const company = await ctx.db.projectCompany.findUnique({
        where: { id: input.projectCompanyId },
      });

      if (!company) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Company not found",
        });
      }

      const [leftRaw, rightRaw] = await Promise.all([
        ctx.db.companyExtract.findFirst({
          where: {
            id: input.leftExtractId,
            projectCompanyId: input.projectCompanyId,
          },
        }),
        ctx.db.companyExtract.findFirst({
          where: {
            id: input.rightExtractId,
            projectCompanyId: input.projectCompanyId,
          },
        }),
      ]);

      if (!leftRaw || !rightRaw) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "One or both extracts not found for this company",
        });
      }

      return {
        company,
        left: serializeExtract(leftRaw),
        right: serializeExtract(rightRaw),
      };
    }),
});
