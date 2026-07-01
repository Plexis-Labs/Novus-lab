import type {
  PermissionGrantSchema,
  PermissionGrantBaseSchema,
  PermissionScopeSchema,
  PermissionStatusSchema,
} from './permissionGrant.schema'
import type { z } from 'zod'

/**
 * Where a permission grant is valid.
 */
export type PermissionScope = z.infer<typeof PermissionScopeSchema>

/**
 * Current lifecycle state of a permission grant.
 */
export type PermissionStatus = z.infer<typeof PermissionStatusSchema>

/**
 * Permission grant before cross-field validation.
 *
 * Primarily useful for testing and schema composition.
 */
export type PermissionGrantBase = z.infer<typeof PermissionGrantBaseSchema>

/**
 * Fully validated permission ledger entry.
 */
export type PermissionGrant = z.infer<typeof PermissionGrantSchema>
