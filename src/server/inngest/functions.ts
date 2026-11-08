import { settleExtract } from "~/server/extracts";
import { EXTRACT_SETTLE_DELAY_MS } from "~/server/sample-data/companies";
import { extractOrdered, inngest } from "./client";

export const settleOrderedExtract = inngest.createFunction(
  { id: "settle-ordered-extract", triggers: [extractOrdered] },
  async ({ event, step }) => {
    const { extractId } = event.data;

    // Fake processing time for the registry lookup.
    await step.sleep("simulate-processing", EXTRACT_SETTLE_DELAY_MS);

    return step.run("settle", async () => {
      const settled = await settleExtract(extractId);
      return { extractId, status: settled.status };
    });
  },
);

export const functions = [settleOrderedExtract];
