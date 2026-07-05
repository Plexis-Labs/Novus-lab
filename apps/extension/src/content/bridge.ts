export class RuntimeBridge {
  public static connect(): void {
    console.info('[Novus Content] Connecting to Runtime...')

    try {
      chrome.runtime.sendMessage(
        {
          type: 'PING_RUNTIME',
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.warn('[Novus Content] Runtime unavailable.', chrome.runtime.lastError.message)
            return
          }

          console.info('[Novus Content] Runtime connected.', response)
        },
      )
    } catch {
      console.error('[Novus Content] Extension context invalidated.')
    }
  }
}
