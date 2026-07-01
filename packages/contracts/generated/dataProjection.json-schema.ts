import { zodToJsonSchema } from 'zod-to-json-schema'

import { dataProjectionSchema } from '../src/core/dataProjection.schema'

export const dataProjectionJsonSchema = zodToJsonSchema(dataProjectionSchema, 'DataProjection')
