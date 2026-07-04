import { logger } from '../logger/logger'

import type { StorageAdapter } from './types'

export class MockStorageAdapter implements StorageAdapter {
  private store = new Map<string, unknown>()

  constructor() {
    logger.info('Mock Storage Adapter initialized. Using in-memory store.')
  }

  get<T>(key: string): Promise<T | null> {
    const value = this.store.get(key) as T
    return Promise.resolve(value ?? null)
  }

  set<T>(key: string, value: T): Promise<void> {
    this.store.set(key, value)
    logger.debug(`Storage: Set ${key}`)
    return Promise.resolve()
  }

  delete(key: string): Promise<void> {
    this.store.delete(key)
    logger.debug(`Storage: Deleted ${key}`)
    return Promise.resolve()
  }

  clear(): Promise<void> {
    this.store.clear()
    logger.info('Mock Storage: Cleared all data')
    return Promise.resolve()
  }
}
