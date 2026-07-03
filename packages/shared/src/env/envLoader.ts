import { z } from 'zod'

import { ValidationError } from '../errors/NovusErrors'

// 1. Tell TS these might exist, but we won't assume they do globally
declare var process: { env?: Record<string, string | undefined> }

// Define Vite's import.meta structure to avoid using 'any'
interface ViteImportMeta {
  env?: Record<string, string | undefined>
}

const envSchema = z
  .object({
    // Added defaults to prevent local crashes
    NOVUS_ENV: z.enum(['development', 'staging', 'production']).default('development'),
    NOVUS_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'fatal']).default('info'),
    NOVUS_AI_PROVIDER: z.enum(['openai', 'anthropic', 'gemini', 'mock']).default('mock'),
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

// 2. Isomorphic Extractor: Handles Node.js AND Vite/Browser environments

function getGlobalEnv(): Record<string, string | undefined> {
  if (typeof process !== 'undefined') {
    if (process.env) {
      return process.env
    }
  }

  // Safely cast import.meta through 'unknown' to our custom interface
  const meta = import.meta as unknown as ViteImportMeta
  if (typeof meta !== 'undefined') {
    if (meta.env) {
      return meta.env
    }
  }

  return {}
}

export function loadEnvironment(): NovusEnvironment {
  if (cachedEnv) return cachedEnv

  const rawEnv = getGlobalEnv()
  const parsed = envSchema.safeParse(rawEnv)

  if (!parsed.success) {
    throw new ValidationError('Invalid Environment Configuration', {
      issues: parsed.error.format(),
    })
  }

  cachedEnv = parsed.data
  return cachedEnv
}

export const env = loadEnvironment()
