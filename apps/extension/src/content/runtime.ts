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
  public static bootstrap(): void {
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

    RuntimeBridge.connect()

    MountManager.initialize()

    NavigationObserver.initialize()

    console.info('[Novus Content] Bootstrap complete.')

    // Future:
    // AdapterRegistry.initialize(host)
    // SelectionObserver.initialize()
    // ContextCollector.initialize()
    // SandboxManager.initialize()
  }
}
