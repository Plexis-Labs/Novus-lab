export type ErrorContext = Record<string, unknown>

// Define an interface for the V8 engine's stack trace API matching Node's native types
interface V8ErrorConstructor {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  captureStackTrace?(targetObject: object, constructorOpt?: Function): void
}

// Base Novus Error. All custom errors must extend this.
export class NovusError extends Error {
  public override readonly name: string
  public readonly context?: ErrorContext | undefined

  constructor(message: string, name = 'NovusError', context?: ErrorContext) {
    super(message)
    this.name = name

    // Only assign context if it actually exists
    if (context !== undefined) {
      this.context = context
    }

    // Safely cast to 'unknown' then to our interface
    const ErrorWithStack = Error as unknown as V8ErrorConstructor
    if (typeof ErrorWithStack.captureStackTrace === 'function') {
      ErrorWithStack.captureStackTrace(this, this.constructor)
    }

    // Fix prototype chain for TypeScript classes extending native Error
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

// Specific Milestone C Typed Errors

export class DeveloperError extends NovusError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'DeveloperError', context)
  }
}

export class RuntimeError extends NovusError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'RuntimeError', context)
  }
}

export class ValidationError extends NovusError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'ValidationError', context)
  }
}

export class AdapterError extends NovusError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'AdapterError', context)
  }
}

export class GenerationError extends NovusError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'GenerationError', context)
  }
}

export class PermissionError extends NovusError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'PermissionError', context)
  }
}
