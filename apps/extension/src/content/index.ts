import { ContentBootstrap } from './bootstrap.js'
import { EnvironmentDetector } from './environment.js'
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

  void ContentRuntime.bootstrap()
}

bootstrap()
