import { z } from 'zod'

import { ValidationError } from '../errors/NovusErrors'

// 1. Tell TS this might exist, but we won't assume it does globally
declare var process: { env: Record<string, string | undefined> }

const envSchema = z
  .object({
    NOVUS_ENV: z.enum(['development', 'staging', 'production']),
    NOVUS_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'fatal']).default('info'),
    NOVUS_AI_PROVIDER: z.enum(['openai', 'anthropic', 'gemini', 'mock']),
    NOVUS_OPENAI_API_KEY: z.string().optional(),
    NOVUS_ANTHROPIC_API_KEY: z.string().optional(),
    NOVUS_GEMINI_API_KEY: z.string().optional(),
    NOVUS_AI_MAX_TOKENS: z.coerce.number().default(4096),
    NOVUS_STORAGE_ADAPTER: z.enum(['indexeddb', 'memory', 'mock']).default('mock'),
    NOVUS_EXTENSION_ID: z.string().optional(),
    NOVUS_ENABLE_BUNDLE_VALIDATION: z
      .enum(['true', 'false'])
      .transform((v) => v === 'true')
      .default('true'),
    NOVUS_ENABLE_SENSITIVE_FIREWALL: z
      .enum(['true', 'false'])
      .transform((v) => v === 'true')
      .default('true'),
    CI: z
      .enum(['true', 'false'])
      .transform((v) => v === 'true')
      .default('false'),
  })
  .superRefine((env, ctx) => {
    if (env.NOVUS_AI_PROVIDER === 'openai' && !env.NOVUS_OPENAI_API_KEY) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['NOVUS_OPENAI_API_KEY'],
        message: 'OpenAI API key is required when provider is openai.',
      })
    }
    if (env.NOVUS_AI_PROVIDER === 'anthropic' && !env.NOVUS_ANTHROPIC_API_KEY) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['NOVUS_ANTHROPIC_API_KEY'],
        message: 'Anthropic API key is required when provider is anthropic.',
      })
    }
    if (env.NOVUS_AI_PROVIDER === 'gemini' && !env.NOVUS_GEMINI_API_KEY) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['NOVUS_GEMINI_API_KEY'],
        message: 'Gemini API key is required when provider is gemini.',
      })
    }
  })

export type NovusEnvironment = z.infer<typeof envSchema>

let cachedEnv: NovusEnvironment | null = null

export function loadEnvironment(): NovusEnvironment {
  if (cachedEnv) return cachedEnv

  // 2. Isomorphic Check: Safely grab env vars without crashing browsers
  const processEnv = typeof process !== 'undefined' ? process.env : {}
  const parsed = envSchema.safeParse(processEnv)

  if (!parsed.success) {
    throw new ValidationError('Invalid Environment Configuration', {
      issues: parsed.error.format(),
    })
  }

  cachedEnv = parsed.data
  return cachedEnv
}

export const env = loadEnvironment()
