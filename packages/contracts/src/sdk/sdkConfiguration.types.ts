import type { sdkConfigurationSchema } from './sdkConfiguration.schema'
import type { z } from 'zod'

export type SdkConfiguration = z.infer<typeof sdkConfigurationSchema>
