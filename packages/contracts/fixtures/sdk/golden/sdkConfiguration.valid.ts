import type { SdkConfiguration } from '../../../src/sdk/sdkConfiguration.types'

export const validSdkConfiguration: SdkConfiguration = {
  workspace: { enabled: true, mode: 'read-write' },
  query: { enabled: true, maxLimit: 500 },
  storage: { enabled: true, quotaMb: 50 },
  annotations: { enabled: false },
  router: { enabled: true, allowedHosts: ['api.github.com', 'linear.app'] },
  feature: { enabled: true },
  permissions: { enabled: false, elevated: false },
}
