import { env } from '../env/envLoader'
import { NovusError } from '../errors/NovusErrors'

// 1. Tell TS process.exit might exist (marked as optional for safe chaining)
declare var process: { exit?: (code: number) => never }

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
}

class JSONLogger {
  private currentLevelValue: number

  constructor(level: LogLevel) {
    this.currentLevelValue = LOG_LEVELS[level]
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= this.currentLevelValue
  }

  private formatMessage(level: LogLevel, message: string, context?: unknown): string {
    const payload: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
    }

    if (context instanceof Error) {
      // 2. Fixed index signature errors using Bracket Notation
      payload['error'] = context.message
      payload['stack'] = context.stack
      if (context instanceof NovusError && context.context) {
        payload['errorContext'] = context.context
      }
    } else if (context !== undefined) {
      payload['context'] = context
    }

    return JSON.stringify(payload)
  }

  public debug(message: string, context?: unknown): void {
    if (this.shouldLog('debug')) console.debug(this.formatMessage('debug', message, context))
  }

  public info(message: string, context?: unknown): void {
    if (this.shouldLog('info')) console.info(this.formatMessage('info', message, context))
  }

  public warn(message: string, context?: unknown): void {
    if (this.shouldLog('warn')) console.warn(this.formatMessage('warn', message, context))
  }

  public error(message: string, context?: unknown): void {
    if (this.shouldLog('error')) console.error(this.formatMessage('error', message, context))
  }

  public fatal(message: string, context?: unknown): void {
    if (this.shouldLog('fatal')) {
      console.error(this.formatMessage('fatal', message, context))
      // 3. Isomorphic Check: Safely invoke exit using optional chaining
      if (typeof process !== 'undefined') {
        process.exit?.(1)
      }
    }
  }
}

export const logger = new JSONLogger(env.NOVUS_LOG_LEVEL)
