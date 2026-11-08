import { eventType, Inngest } from "inngest";
import { z } from "zod";

export const inngest = new Inngest({ id: "hire-test" });

export const extractOrdered = eventType("extract/ordered", {
  schema: z.object({ extractId: z.string() }),
});
