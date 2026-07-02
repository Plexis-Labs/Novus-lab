import type { AdapterCompatibilitySchema } from './AdapterCompatibility.schema'
import type {
  CompatibilityMatrixMetadataSchema,
  CompatibilityMatrixSchema,
  GenerationCompatibilitySchema,
  RuntimeCompatibilitySchema,
} from './compatibilityMatrix.schema'
import type {
  RevocationEntrySchema,
  RevocationPolicySchema,
  RevocationReasonSchema,
} from './RevocationReason.schema'
import type { RuntimeRecommendationsSchema } from './RuntimeRecommendation.schema'
import type { z } from 'zod'
/* -------------------------------------------------------------------------- */
/* Nested Types                                */
/* -------------------------------------------------------------------------- */

export type CompatibilityMatrixMetadata = z.infer<typeof CompatibilityMatrixMetadataSchema>

export type RuntimeCompatibility = z.infer<typeof RuntimeCompatibilitySchema>

export type GenerationCompatibility = z.infer<typeof GenerationCompatibilitySchema>

export type AdapterCompatibility = z.infer<typeof AdapterCompatibilitySchema>

export type RevocationReason = z.infer<typeof RevocationReasonSchema>

export type RevocationEntry = z.infer<typeof RevocationEntrySchema>

export type RevocationPolicy = z.infer<typeof RevocationPolicySchema>

export type RuntimeRecommendations = z.infer<typeof RuntimeRecommendationsSchema>

/* -------------------------------------------------------------------------- */
/* Root Contract                                */
/* -------------------------------------------------------------------------- */

export type CompatibilityMatrix = z.infer<typeof CompatibilityMatrixSchema>
