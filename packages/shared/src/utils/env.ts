import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

import { z } from 'zod'

import { ValidationError } from '../errors/index.js'

const BooleanLikeStringSchema = z.preprocess((value) => {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()

    if (['true', '1', 'yes', 'on'].includes(normalized)) {
      return true
    }

    if (['false', '0', 'no', 'off', ''].includes(normalized)) {
      return false
    }
  }

  return value
}, z.boolean())

const StringOrUndefinedSchema = z.preprocess((value) => {
  if (typeof value !== 'string') {
    return undefined
  }

  const trimmed = value.trim()
  return trimmed === '' ? undefined : trimmed
}, z.string().optional())

export const NovusEnvSchema = z
  .object({
    NOVUS_ENV: z.enum(['development', 'staging', 'production']).default('development'),
    NOVUS_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'fatal']).default('info'),
    NOVUS_AI_PROVIDER: z.enum(['openai', 'anthropic', 'gemini', 'mock']).default('mock'),
    NOVUS_OPENAI_API_KEY: StringOrUndefinedSchema,
    NOVUS_ANTHROPIC_API_KEY: StringOrUndefinedSchema,
    NOVUS_GEMINI_API_KEY: StringOrUndefinedSchema,
    NOVUS_AI_MAX_TOKENS: z.coerce.number().int().positive().default(4096),
    NOVUS_STORAGE_ADAPTER: z.enum(['indexeddb', 'memory', 'mock']).default('mock'),
    NOVUS_EXTENSION_ID: StringOrUndefinedSchema,
    NOVUS_ENABLE_BUNDLE_VALIDATION: BooleanLikeStringSchema.default(true),
    NOVUS_ENABLE_SENSITIVE_FIREWALL: BooleanLikeStringSchema.default(true),
    CI: BooleanLikeStringSchema.default(false),
  })
  .superRefine((value, ctx) => {
    const provider = value.NOVUS_AI_PROVIDER

    if (provider === 'mock') {
      return
    }

    if (provider === 'openai' && !value.NOVUS_OPENAI_API_KEY) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['NOVUS_OPENAI_API_KEY'],
        message: 'Missing required environment variable.',
      })
    }

    if (provider === 'anthropic' && !value.NOVUS_ANTHROPIC_API_KEY) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['NOVUS_ANTHROPIC_API_KEY'],
        message: 'Missing required environment variable.',
      })
    }

    if (provider === 'gemini' && !value.NOVUS_GEMINI_API_KEY) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['NOVUS_GEMINI_API_KEY'],
        message: 'Missing required environment variable.',
      })
    }
  })

export type NovusEnvironment = z.infer<typeof NovusEnvSchema>

function parseEnvFileContents(contents: string): Record<string, string> {
  const values: Record<string, string> = {}

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const match = /^((?:export)\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(trimmed)

    if (!match) {
      continue
    }

    const [, , key, rawValue] = match

    if (!key || rawValue === undefined) {
      continue
    }

    let value = rawValue.trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    values[key] = value
  }

  return values
}

function readEnvFile(cwd: string): Record<string, string> {
  const envPath = path.resolve(cwd, '.env')

  if (!existsSync(envPath)) {
    return {}
  }

  return parseEnvFileContents(readFileSync(envPath, 'utf8'))
}

export function loadEnvironment(
  options: { cwd?: string; env?: typeof process.env } = {},
): NovusEnvironment {
  const cwd = options.cwd ?? process.cwd()
  const sourceEnv = options.env ?? process.env
  const fileEnv = readEnvFile(cwd)

  const mergedEnv = {
    ...sourceEnv,
    ...fileEnv,
  }

  try {
    return NovusEnvSchema.parse(mergedEnv)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issue = error.issues[0]
      const missingField = typeof issue?.path[0] === 'string' ? issue.path[0] : undefined

      throw new ValidationError('Missing required environment variable.', {
        variable: missingField,
        cause: error,
      })
    }

    throw new ValidationError('Missing required environment variable.', { cause: error })
  }
}

export function getEnvironment(
  options: { cwd?: string; env?: typeof process.env } = {},
): NovusEnvironment {
  return loadEnvironment(options)
}
