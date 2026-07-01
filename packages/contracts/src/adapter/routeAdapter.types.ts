import type { routeAdapterSchema } from './routeAdapter.schema'
import type { z } from 'zod'

export type RouteAdapter = z.infer<typeof routeAdapterSchema>
