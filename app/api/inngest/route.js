import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";

// Create an API that serves zero functions (Supabase logic removed)
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [],
});
