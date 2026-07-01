import type { DatasetProvenance } from '../../../src/workspace/datasetProvenance.types'

export const validDatasetProvenance: DatasetProvenance = {
  collectionMode: 'automated',
  adapterVersion: '1.2.0',
  source: 'https://api.linear.app/v1/issues',
  warnings: ['Field "custom_status" was ignored due to strict projection rules'],
  timestamp: new Date().toISOString(),
}
