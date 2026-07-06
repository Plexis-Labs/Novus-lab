import { MountManager } from './mount.js'

/**
 * Observes client-side navigation events on SPA websites.
 *
 * Chrome only injects the content script once per tab.
 * Modern websites frequently change URLs without reloading.
 * This observer allows future adapters to react to route changes.
 */
export class NavigationObserver {
  private static currentUrl = window.location.href

  public static initialize(): void {
    console.info('[Novus Content] Navigation observer initialized.')

    const observer = new MutationObserver(() => {
      const nextUrl = window.location.href

      if (nextUrl === this.currentUrl) {
        return
      }

      const previousUrl = this.currentUrl
      this.currentUrl = nextUrl

      this.handleNavigation(previousUrl, nextUrl)
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  private static handleNavigation(previousUrl: string, currentUrl: string): void {
    console.info(`[Novus Content] Navigation detected:\n${previousUrl}\n→ ${currentUrl}`)

    MountManager.remount()

    // Future:
    // AdapterRegistry.notifyNavigation(...)
    // MountManager.remount(...)
    // ContextCollector.refresh(...)
  }
}
