import { zodToJsonSchema } from 'zod-to-json-schema'

import { PermissionGrantSchema } from '../src/security/permissionGrant.schema'

/**
 * Machine-readable JSON Schema representation of
 * the PermissionGrant contract.
 *
 * Generated from the Zod schema to ensure a single
 * source of truth across the Novus platform.
 */
export const PermissionGrantJsonSchema = zodToJsonSchema(PermissionGrantSchema, {
  name: 'PermissionGrant',
  target: 'jsonSchema7',
})
