/**
 * Raised when a Bridge request exceeds the
 * configured transport timeout.
 *
 * Indicates that the Runtime failed to
 * respond before the client-side deadline.
 */
export class TimeoutError extends Error {
  public constructor(timeoutMs: number) {
    super(`Bridge request timed out after ${timeoutMs} ms.`)

    this.name = 'TimeoutError'
  }
}
