import type { BridgeError } from '@novus/contracts'

/**
 * Responsible for translating between
 * native JavaScript errors and the
 * Runtime Bridge error protocol.
 *
 * Owns:
 * - Error serialization
 * - Error deserialization
 *
 * Does NOT own:
 * - Logging
 * - Transport
 * - Error handling
 */
export class ErrorSerializer {
  /**
   * Converts an arbitrary thrown value into a
   * canonical Bridge error object.
   */
  public static serialize(error: unknown): BridgeError['error'] {
    if (error instanceof Error) {
      return {
        code: this.mapCode(error),

        message: error.message,

        details: undefined,
      }
    }

    return {
      code: 'INTERNAL_ERROR',

      message: typeof error === 'string' ? error : 'An unknown Runtime error occurred.',

      details: error !== null && typeof error === 'object' ? error : undefined,
    }
  }

  /**
   * Reconstructs a native JavaScript Error
   * from a Bridge error payload.
   */
  public static deserialize(bridgeError: BridgeError['error']): Error {
    const error = new Error(bridgeError.message)

    error.name = bridgeError.code

    return error
  }

  /**
   * Maps native JavaScript errors into the
   * canonical Bridge error codes.
   */
  private static mapCode(error: Error): BridgeError['error']['code'] {
    switch (error.name) {
      case 'TimeoutError':
        return 'TIMEOUT'

      case 'ValidationError':
        return 'VALIDATION_FAILED'

      case 'PermissionError':
        return 'UNAUTHORIZED'

      case 'NotFoundError':
        return 'NOT_FOUND'

      case 'UnknownMethodError':
        return 'METHOD_NOT_SUPPORTED'

      default:
        return 'INTERNAL_ERROR'
    }
  }
}
