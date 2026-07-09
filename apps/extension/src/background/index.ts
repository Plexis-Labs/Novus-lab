import { HealthMonitor } from './health.js'

/**
 * Novus Lab - Trusted Runtime (Service Worker)
 * This script runs in the background and has full access to Chrome APIs.
 */

function bootstrapRuntime(): void {
  console.log('[Novus Runtime] Bootstrapping Service Worker...')

  // Basic health check endpoint for future diagnostics

  HealthMonitor.initialize()

  console.log('[Novus Runtime] Bootstrap complete.')
}

bootstrapRuntime()
