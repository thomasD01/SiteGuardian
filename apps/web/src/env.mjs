import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL:    z.string().url(),
    DIRECT_URL:      z.string().url(),
    NODE_ENV:        z.enum(["development", "test", "production"]).default("development"),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL:    z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string() : z.string().url()
    ),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL:              z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY:         z.string(),
    NEXT_PUBLIC_CAPTCHA_SITE_KEY:          z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL:   process.env.DIRECT_URL,
    NODE_ENV:     process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL:    process.env.NEXTAUTH_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_URL:  process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_CAPTCHA_SITE_KEY:  process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY,
  },
  emptyStringAsUndefined: true,
});
