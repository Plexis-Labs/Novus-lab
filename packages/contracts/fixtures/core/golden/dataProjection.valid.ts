import type { DataProjection } from '../../../src/core/dataProjection.types'

export const validDataProjection: DataProjection = {
  projection: {
    mode: 'strict',
  },
  normalization: {
    casing: 'camelCase',
    trimStrings: true,
  },
  allowedFields: ['id', 'title', 'status', 'assignee.name'],
  forbiddenFields: ['password', 'ssn', 'internal_metadata'],
}
