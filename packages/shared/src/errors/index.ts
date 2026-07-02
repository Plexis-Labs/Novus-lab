export type ErrorCode =
  | 'DEVELOPER_ERROR'
  | 'RUNTIME_ERROR'
  | 'VALIDATION_ERROR'
  | 'ADAPTER_ERROR'
  | 'GENERATION_ERROR'
  | 'PERMISSION_ERROR'

export type NovusErrorContext = Readonly<Record<string, unknown>>

export class NovusError extends Error {
  readonly code: ErrorCode
  readonly status: number
  readonly context: NovusErrorContext
  override readonly cause?: unknown

  constructor(
    message: string,
    options: {
      code?: ErrorCode
      status?: number
      context?: NovusErrorContext
      cause?: unknown
    } = {},
  ) {
    super(message)
    this.name = 'NovusError'
    this.code = options.code ?? 'RUNTIME_ERROR'
    this.status = options.status ?? 500
    this.context = options.context ?? {}
    this.cause = options.cause
  }
}

export class DeveloperError extends NovusError {
  constructor(message: string, context?: NovusErrorContext, cause?: unknown) {
    const resolvedContext = context ?? {}
    super(message, { code: 'DEVELOPER_ERROR', status: 500, context: resolvedContext, cause })
    this.name = 'DeveloperError'
  }
}

export class RuntimeError extends NovusError {
  constructor(message: string, context?: NovusErrorContext, cause?: unknown) {
    const resolvedContext = context ?? {}
    super(message, { code: 'RUNTIME_ERROR', status: 500, context: resolvedContext, cause })
    this.name = 'RuntimeError'
  }
}

export class ValidationError extends NovusError {
  constructor(message: string, context?: NovusErrorContext, cause?: unknown) {
    const resolvedContext = context ?? {}
    super(message, { code: 'VALIDATION_ERROR', status: 400, context: resolvedContext, cause })
    this.name = 'ValidationError'
  }
}

export class AdapterError extends NovusError {
  constructor(message: string, context?: NovusErrorContext, cause?: unknown) {
    const resolvedContext = context ?? {}
    super(message, { code: 'ADAPTER_ERROR', status: 502, context: resolvedContext, cause })
    this.name = 'AdapterError'
  }
}

export class GenerationError extends NovusError {
  constructor(message: string, context?: NovusErrorContext, cause?: unknown) {
    const resolvedContext = context ?? {}
    super(message, { code: 'GENERATION_ERROR', status: 424, context: resolvedContext, cause })
    this.name = 'GenerationError'
  }
}

export class PermissionError extends NovusError {
  constructor(message: string, context?: NovusErrorContext, cause?: unknown) {
    const resolvedContext = context ?? {}
    super(message, { code: 'PERMISSION_ERROR', status: 403, context: resolvedContext, cause })
    this.name = 'PermissionError'
  }
}

export function isNovusError(value: unknown): value is NovusError {
  return value instanceof NovusError
}
