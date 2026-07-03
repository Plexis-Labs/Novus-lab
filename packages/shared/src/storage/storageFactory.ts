import { MockStorageAdapter } from './MockStorageAdapter'
import { env } from '../env/envLoader'
import { AdapterError } from '../errors/NovusErrors'

import type { StorageAdapter } from './types'

export function getStorageAdapter(): StorageAdapter {
  switch (env.NOVUS_STORAGE_ADAPTER) {
    case 'mock':
      return new MockStorageAdapter()

    case 'memory':
      return new MockStorageAdapter() // Reusing the same in-memory logic

    case 'indexeddb':
      // Placeholder for future IndexedDB implementation
      throw new AdapterError('IndexedDB storage not yet implemented.')

    default:
      throw new AdapterError(
        `Storage adapter ${String(env.NOVUS_STORAGE_ADAPTER)} is not supported.`,
      )
  }
}
