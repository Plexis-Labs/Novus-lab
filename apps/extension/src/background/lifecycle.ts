/**
 * Runtime Lifecycle
 *
 * Registers Chrome Service Worker lifecycle events.
 */
export class RuntimeLifecycle {
  public static initialize(): void {
    console.info('[Novus Runtime] Registering lifecycle listeners...')

    chrome.runtime.onInstalled.addListener(this.handleInstalled)
    chrome.runtime.onStartup.addListener(this.handleStartup)
    chrome.runtime.onSuspend.addListener(this.handleSuspend)
  }

  private static handleInstalled(this: void, details: chrome.runtime.InstalledDetails): void {
    // Cast to string to safely compare with the Chrome extension API type definitions
    const reason = details.reason as string

    switch (reason) {
      case 'install':
        console.info('[Novus Runtime] Extension installed.')
        break

      case 'update':
        console.info(
          `[Novus Runtime] Extension updated from ${details.previousVersion ?? 'unknown'}.`,
        )
        break

      case 'chrome_update':
        console.info('[Novus Runtime] Chrome updated.')
        break

      default:
        console.info('[Novus Runtime] Installation event received.')
    }
  }

  private static handleStartup(this: void): void {
    console.info('[Novus Runtime] Browser startup detected.')
  }

  private static handleSuspend(this: void): void {
    console.warn('[Novus Runtime] Service Worker suspending.')
  }
}
