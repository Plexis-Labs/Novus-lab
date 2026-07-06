import { HealthMonitor } from './health.js'
import { RuntimeLifecycle } from './lifecycle.js'

export class RuntimeKernel {
  public static bootstrap(): void {
    console.info('[Novus Runtime] Runtime Kernel initialized.')

    RuntimeLifecycle.initialize()
    HealthMonitor.initialize()

    // Future:
    // MessageBus.initialize();
    // FeatureRegistry.initialize();
    // AdapterRegistry.initialize();
    // StorageEngine.initialize();
  }
}
