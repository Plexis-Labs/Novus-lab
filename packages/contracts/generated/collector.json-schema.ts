import { zodToJsonSchema } from 'zod-to-json-schema'

import { collectorSchema } from '../src/core/collector.schema'

export const collectorJsonSchema = zodToJsonSchema(collectorSchema, 'CollectorState')
