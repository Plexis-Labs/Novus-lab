import { ContentBootstrap } from './bootstrap.js'
import { RuntimeBridge } from './bridge.js'
import { EnvironmentDetector } from './environment.js'
import { MountManager } from './mount.js'
import { NavigationObserver } from './navigation.js'

/**
 * Content Runtime
 *
 * Coordinates initialization of every subsystem running
 * inside the isolated content script environment.
 */
export class ContentRuntime {
  public static async bootstrap(): Promise<void> {
    console.info('[Novus Content] Bootstrapping Content Runtime...')

    if (!ContentBootstrap.verifySingleInjection()) {
      return
    }

    const host = EnvironmentDetector.detect()

    console.info(`[Novus Content] Host detected: ${host}`)

    if (host === 'unknown') {
      console.warn('[Novus Content] Unsupported host. Initialization aborted.')
      return
    }

    try {
      // 2. Await critical setup tasks sequentially or in parallel
      await RuntimeBridge.connect()

      MountManager.initialize()
      NavigationObserver.initialize()

      console.info('[Novus Content] Bootstrap complete.')
    } catch (error) {
      // 3. Prevent silent crashes by catching errors

      console.error('[Novus Content] Bootstrap failed:', error)
      throw error
    }

    // Future:
    // AdapterRegistry.initialize(host)
    // SelectionObserver.initialize()
    // ContextCollector.initialize()
    // SandboxManager.initialize()
  }
}
