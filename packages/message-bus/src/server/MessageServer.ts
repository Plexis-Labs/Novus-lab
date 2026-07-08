import type { BridgeError, BridgeRequest, BridgeResponse } from '@novus/contracts'

/**
 * Runtime handler.
 *
 * Receives only the payload. Transport
 * metadata remains inside the Message Bus.
 */
export type MessageHandler<TPayload = unknown, TResult = unknown> = (
  payload: TPayload,
  sender: chrome.runtime.MessageSender,
) => Promise<TResult> | TResult

/**
 * Central runtime message router.
 *
 * Owns:
 * - handler registration
 * - chrome.runtime integration
 * - bridge protocol adaptation
 */
export class MessageServer {
  private readonly handlers = new Map<string, MessageHandler>()

  private listening = false

  /**
   * Register a runtime handler.
   */
  public register<TPayload = unknown, TResult = unknown>(
    method: string,
    handler: MessageHandler<TPayload, TResult>,
  ): void {
    if (this.handlers.has(method)) {
      console.warn(`[MessageServer] Overwriting handler "${method}".`)
    }

    this.handlers.set(method, handler as MessageHandler)
  }

  /**
   * Starts listening for Bridge requests.
   *
   * Safe to invoke multiple times.
   */
  public listen(): void {
    if (this.listening) {
      return
    }

    this.listening = true

    chrome.runtime.onMessage.addListener((request: BridgeRequest, sender, sendResponse) => {
      void this.handleMessage(request, sender, sendResponse)

      return true
    })
  }

  /**
   * Dispatches an incoming Bridge request.
   */
  private async handleMessage(
    request: BridgeRequest,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: BridgeResponse | BridgeError) => void,
  ): Promise<void> {
    const handler = this.handlers.get(request.method)

    if (handler === undefined) {
      sendResponse(
        this.buildErrorResponse(
          request,
          new Error(`No handler registered for "${request.method}".`),
        ),
      )

      return
    }

    try {
      const result = await handler(request.payload, sender)

      sendResponse(this.buildSuccessResponse(request, result))
    } catch (error) {
      sendResponse(this.buildErrorResponse(request, error))
    }
  }

  /**
   * Constructs a Bridge success response.
   *
   * TODO(P1-B003):
   * Build a dedicated response header
   * instead of echoing the request header.
   */
  private buildSuccessResponse(request: BridgeRequest, payload: unknown): BridgeResponse {
    return {
      kind: 'response',

      header: request.header,

      payload,
    }
  }

  /**
   * Constructs a Bridge error response.
   *
   * TODO(P1-B004):
   * Replace generic errors with the
   * Runtime Error Registry.
   */
  private buildErrorResponse(request: BridgeRequest, error: unknown): BridgeError {
    const runtimeError = error instanceof Error ? error : new Error(String(error))

    return {
      kind: 'error',

      header: request.header,

      error: {
        code: 'INTERNAL_ERROR',

        message: runtimeError.message,

        details: {
          stack: runtimeError.stack,
        },
      },
    }
  }
}
