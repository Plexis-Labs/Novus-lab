import { ContentBootstrap } from './bootstrap.js'
import { RuntimeBridge } from './bridge.js'
import { EnvironmentDetector } from './environment.js'
import { MountManager } from './mount.js'
import { NavigationObserver } from './navigation.js'
import { ContentRuntime } from './runtime.js'

function bootstrap(): void {
  if (!ContentBootstrap.verifySingleInjection()) {
    return
  }

  const host = EnvironmentDetector.detect()

  console.info(`[Novus Content] Host detected: ${host}`)

  if (host === 'unknown') {
    return
  }

  RuntimeBridge.connect()

  MountManager.initialize()

  NavigationObserver.initialize()

  ContentRuntime.bootstrap()

  // Future:
  // MountManager.initialize();
}

bootstrap()
