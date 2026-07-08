import type { BridgeError, BridgeRegistry, BridgeRequest, BridgeResponse } from '@novus/contracts'

/**
 * Runtime handler.
 *
 * Receives only the payload. Transport
 * metadata remains inside the Message Bus.
 *
 * NOTE:
 * Payload validation is the responsibility
 * of the registered handler using the
 * appropriate Zod schema from @novus/contracts.
 */
export type MessageHandler = (payload: unknown, sender: chrome.runtime.MessageSender) => unknown

/**
 * Central runtime message router.
 *
 * Owns:
 * - handler registration
 * - chrome.runtime integration
 * - bridge protocol adaptation
 */
export class MessageServer {
  /**
   * Runtime handler registry.
   *
   * Handlers are intentionally stored without
   * payload typing because Chrome delivers
   * untrusted payloads across the runtime
   * boundary.
   */
  private readonly handlers = new Map<keyof BridgeRegistry, MessageHandler>()

  private listening = false

  /**
   * Register a runtime handler.
   *
   * The Bridge Method must originate from the
   * canonical Bridge Registry.
   */
  public register(method: keyof BridgeRegistry, handler: MessageHandler): void {
    if (this.handlers.has(method)) {
      console.warn(`[MessageServer] Overwriting handler "${method}".`)
    }

    this.handlers.set(method, handler)
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
    const handler = this.handlers.get(request.method as keyof BridgeRegistry)

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
