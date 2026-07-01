import { zodToJsonSchema } from 'zod-to-json-schema'

import { sdkConfigurationSchema } from '../src/sdk/sdkConfiguration.schema'

export const sdkConfigurationJsonSchema = zodToJsonSchema(
  sdkConfigurationSchema,
  'SdkConfiguration',
)
