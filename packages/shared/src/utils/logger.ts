export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

export interface StructuredLogEntry {
  readonly level: LogLevel
  readonly message: string
  readonly timestamp: string
  readonly logger?: string
  readonly context?: Record<string, unknown>
  readonly error?: unknown
}

export type LoggerTransport = (entry: StructuredLogEntry) => void

export interface LoggerOptions {
  readonly name?: string
  readonly level?: LogLevel
  readonly transport?: LoggerTransport
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  fatal: 50,
}

function normalizeLevel(level: LogLevel | undefined): LogLevel {
  return level ?? 'info'
}

function shouldLog(level: LogLevel, configuredLevel: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[configuredLevel]
}

export function createLogger(options: LoggerOptions = {}): {
  readonly debug: (message: string, context?: Record<string, unknown>) => void
  readonly info: (message: string, context?: Record<string, unknown>) => void
  readonly warn: (message: string, context?: Record<string, unknown>) => void
  readonly error: (message: string, error?: unknown, context?: Record<string, unknown>) => void
  readonly fatal: (message: string, error?: unknown, context?: Record<string, unknown>) => void
} {
  const name = options.name
  const level = normalizeLevel(options.level)
  const transport =
    options.transport ??
    ((entry: StructuredLogEntry) => {
      console.info(JSON.stringify(entry))
    })

  const emit = (
    logLevel: LogLevel,
    message: string,
    error?: unknown,
    context?: Record<string, unknown>,
  ): void => {
    if (!shouldLog(logLevel, level)) {
      return
    }

    const entry: StructuredLogEntry = {
      level: logLevel,
      message,
      timestamp: new Date().toISOString(),
      ...(name ? { logger: name } : {}),
      ...(context ? { context } : {}),
      ...(error ? { error } : {}),
    }

    transport(entry)
  }

  return {
    debug: (message, context) => emit('debug', message, undefined, context),
    info: (message, context) => emit('info', message, undefined, context),
    warn: (message, context) => emit('warn', message, undefined, context),
    error: (message, error, context) => emit('error', message, error, context),
    fatal: (message, error, context) => emit('fatal', message, error, context),
  }
}
