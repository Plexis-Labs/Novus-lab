import { BRIDGE_PROTOCOL_VERSION } from '@novus/contracts'

import { ErrorSerializer } from '../errors/ErrorSerializer.js'

import type { BridgeError, BridgeRegistry, BridgeRequest, BridgeResponse } from '@novus/contracts'
/**
 *
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
  /**
   * Dispatches an incoming Bridge request.
   */
  private async handleMessage(
    request: BridgeRequest,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: BridgeResponse | BridgeError) => void,
  ): Promise<void> {
    const protocolError = this.validateProtocolVersion(request)

    if (protocolError !== null) {
      sendResponse(protocolError)
      return
    }
    const response = await this.executeHandler(request, sender)

    sendResponse(response)
  }

  /**
   * Executes a registered runtime handler and
   * deterministically produces a Bridge response.
   *
   * Owns:
   * - Handler lookup
   * - Handler execution
   * - Exception handling
   * - Response construction
   */
  private async executeHandler(
    request: BridgeRequest,
    sender: chrome.runtime.MessageSender,
  ): Promise<BridgeResponse | BridgeError> {
    const handler = this.handlers.get(request.method as keyof BridgeRegistry)

    if (handler === undefined) {
      return this.buildErrorResponse(
        request,
        new Error(`No handler registered for "${request.method}".`),
      )
    }

    const startedAt = performance.now()

    this.traceExecutionStart(request)

    try {
      const payload = await handler(request.payload, sender)

      const duration = performance.now() - startedAt

      this.traceExecutionSuccess(request, duration)

      return this.buildSuccessResponse(request, payload)
    } catch (error) {
      const duration = performance.now() - startedAt

      this.traceExecutionFailure(request, duration, error)
      return this.buildErrorResponse(request, error)
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
  /**
   * Constructs a Bridge error response.
   */
  private buildErrorResponse(request: BridgeRequest, error: unknown): BridgeError {
    return {
      kind: 'error',

      header: request.header,

      error: ErrorSerializer.serialize(error),
    }
  }
  /**
   * Validates the incoming Bridge protocol.
   *
   * Requests targeting an unsupported protocol
   * version are rejected before any business
   * logic executes.
   */
  private validateProtocolVersion(request: BridgeRequest): BridgeError | null {
    if (request.header.protocolVersion !== BRIDGE_PROTOCOL_VERSION) {
      return this.buildErrorResponse(
        request,
        new Error(
          `Unsupported Bridge protocol version "${String(request.header.protocolVersion)}". Expected "${String(BRIDGE_PROTOCOL_VERSION)}".`,
        ),
      )
    }

    return null
  }
  /**
   * Emits a trace indicating that a Bridge
   * request has begun execution.
   *
   * TODO(P2-OBS):
   * Replace console.debug with the
   * Observability Engine.
   */
  private traceExecutionStart(request: BridgeRequest): void {
    console.debug(`[MessageServer] ↘ ${request.header.correlationId} ${request.method}`)
  }

  /**
   * Emits a trace indicating that a Bridge
   * request completed successfully.
   *
   * TODO(P2-OBS):
   * Replace console.debug with the
   * Observability Engine.
   */
  private traceExecutionSuccess(request: BridgeRequest, durationMs: number): void {
    console.debug(
      `[MessageServer] ↗ ${request.header.correlationId} ${request.method} (${durationMs.toFixed(2)} ms)`,
    )
  }

  /**
   * Emits a trace indicating that a Bridge
   * request failed.
   *
   * TODO(P2-OBS):
   * Replace console.error with the
   * Observability Engine.
   */
  private traceExecutionFailure(request: BridgeRequest, durationMs: number, error: unknown): void {
    console.error(
      `[MessageServer] ✖ ${request.header.correlationId} ${request.method} (${durationMs.toFixed(2)} ms)`,
      error,
    )
  }
}
