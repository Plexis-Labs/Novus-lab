/**
 * Mount Manager
 *
 * Owns the lifecycle of all UI injected into the host page.
 *
 * Phase 1:
 * - Bootstrap only.
 *
 * Future:
 * - Shadow DOM
 * - Sandbox iframe
 * - Floating UI
 * - Cleanup
 */
export class MountManager {
  private static initialized = false

  public static initialize(): void {
    if (this.initialized) {
      return
    }

    this.initialized = true

    console.info('[Novus Content] Mount Manager initialized.')
  }

  public static remount(): void {
    console.info('[Novus Content] Remount requested.')

    // Future:
    // destroy()
    // mount()
  }

  public static destroy(): void {
    console.info('[Novus Content] Destroy requested.')

    // Future:
    // Remove Shadow DOM
    // Remove iframe
    // Cleanup listeners
  }
}
