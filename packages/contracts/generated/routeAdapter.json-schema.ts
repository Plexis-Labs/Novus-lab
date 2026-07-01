import { zodToJsonSchema } from 'zod-to-json-schema'

import { routeAdapterSchema } from '../src/adapter/routeAdapter.schema'

export const routeAdapterJsonSchema = zodToJsonSchema(routeAdapterSchema, 'RouteAdapter')
