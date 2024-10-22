import { serve } from "https://deno.land/std/http/server.ts";

serve(() => new Response("Hello from Deno!"), { port: 8000 });
