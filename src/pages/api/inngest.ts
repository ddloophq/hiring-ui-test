import { serve } from "inngest/next";
import { inngest } from "~/server/inngest/client";
import { functions } from "~/server/inngest/functions";

export default serve({ client: inngest, functions });
