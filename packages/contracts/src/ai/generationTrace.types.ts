import type {
  GenerationTraceSchema,
  TraceMetadataSchema,
  TraceConfigurationSchema,
  TraceOutcomeSchema,
  TraceMetricsSchema,
  TraceTokenUsageSchema,
  TracePerformanceSchema,
  TraceBillingSchema,
  TraceEvaluationSchema,
  TraceArtifactSchema,
  TracePrivacySchema,
  TraceStatusSchema,
  TraceStageSchema,
  GenerationTraceSchemaVersionSchema,
} from './generationTrace.schema'
import type { z } from 'zod'

/* -------------------------------------------------------------------------- */
/*                               Root Contract                                */
/* -------------------------------------------------------------------------- */

export type GenerationTrace = z.infer<typeof GenerationTraceSchema>

/* -------------------------------------------------------------------------- */
/*                                Root Sections                               */
/* -------------------------------------------------------------------------- */

export type TraceMetadata = z.infer<typeof TraceMetadataSchema>

export type TraceConfiguration = z.infer<typeof TraceConfigurationSchema>

export type TraceOutcome = z.infer<typeof TraceOutcomeSchema>

export type TraceMetrics = z.infer<typeof TraceMetricsSchema>

export type TraceEvaluation = z.infer<typeof TraceEvaluationSchema>

export type TraceArtifact = z.infer<typeof TraceArtifactSchema>

export type TracePrivacy = z.infer<typeof TracePrivacySchema>

/* -------------------------------------------------------------------------- */
/*                            Nested Metric Types                             */
/* -------------------------------------------------------------------------- */

export type TraceTokenUsage = z.infer<typeof TraceTokenUsageSchema>

export type TracePerformance = z.infer<typeof TracePerformanceSchema>

export type TraceBilling = z.infer<typeof TraceBillingSchema>

/* -------------------------------------------------------------------------- */
/*                               Shared Enums                                */
/* -------------------------------------------------------------------------- */

export type TraceStatus = z.infer<typeof TraceStatusSchema>

export type TraceStage = z.infer<typeof TraceStageSchema>

export type GenerationTraceSchemaVersion = z.infer<typeof GenerationTraceSchemaVersionSchema>
