import { z } from 'zod'

/**
 * Canonical UUID identifier.
 */
export const UuidSchema = z.string().uuid()

/**
 * Stable identifier.
 *
 * Examples
 *
 * reviewChecklist
 * overview
 * github_pr
 * review-checklist
 */
export const IdentifierSchema = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[A-Za-z][A-Za-z0-9_-]*$/, 'Identifiers must begin with a letter.')

export const FeatureIdSchema = UuidSchema

export const ArtifactIdSchema = UuidSchema

export const TraceIdSchema = UuidSchema

export const WidgetIdSchema = IdentifierSchema

export const ViewIdSchema = IdentifierSchema

export const AdapterIdSchema = IdentifierSchema

export const EntityIdSchema = IdentifierSchema

export const ModelIdentifierSchema = z
  .string()
  .trim()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z][A-Za-z0-9._-]*$/, 'Invalid model identifier.')
export const ModelIdSchema = ModelIdentifierSchema

export const ProviderIdSchema = IdentifierSchema
