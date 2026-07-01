import type { CollectorState } from '../../../src/core/collector.types'

export const validCollectorState: CollectorState = {
  pagination: {
    cursor: 'eyJpZCI6MTIzfQ==',
    limit: 100,
    hasNextPage: true,
  },
  progress: {
    recordsProcessed: 450,
    status: 'running',
  },
  coverage: 45.5,
}
