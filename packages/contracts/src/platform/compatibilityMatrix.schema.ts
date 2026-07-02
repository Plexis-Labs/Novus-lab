import { z } from 'zod'

import { AdapterCompatibilitySchema } from './AdapterCompatibility.schema'
import { RuntimeRecommendationsSchema } from './RuntimeRecommendation.schema'
import { RevocationPolicySchema } from '../platform/RevocationReason.schema'
import {
  RuntimeVersionSchema,
  SupportedSdkRangeSchema,
  SupportedCompilerRangeSchema,
  SupportedManifestRangeSchema,
  PromptVersionSchema,
} from '../primitives'
/**
 *
 *
 * Current Compatibility Matrix schema version.
 */
export const CompatibilityMatrixSchemaVersionSchema = z.literal(1)

/**
 * Immutable metadata describing
 * a published compatibility matrix.
 */
export const CompatibilityMatrixMetadataSchema = z
  .object({
    /**
     * Schema version.
     */
    schemaVersion: CompatibilityMatrixSchemaVersionSchema,

    /**
     * Publication timestamp.
     *
     * Unix milliseconds.
     */
    publishedAt: z.number().int().positive(),
  })
  .strict()

/**
 * Versions accepted by
 * this Runtime release.
 */
export const RuntimeCompatibilitySchema = z
  .object({
    /**
     * Runtime implementing
     * this compatibility matrix.
     */
    runtimeVersion: RuntimeVersionSchema,

    /**
     * Accepted SDK versions.
     */
    supportedSdkVersions: SupportedSdkRangeSchema,

    /**
     * Accepted compiler versions.
     */
    supportedCompilerVersions: SupportedCompilerRangeSchema,

    /**
     * Accepted manifest versions.
     */
    supportedManifestVersions: SupportedManifestRangeSchema,
  })
  .strict()

/* -------------------------------------------------------------------------- */
/*                         Generation Compatibility                           */
/* -------------------------------------------------------------------------- */

/**
 * AI generation compatibility.
 *
 * Defines which AI providers,
 * models and prompt templates
 * are officially supported by
 * this Runtime release.
 *
 * This section intentionally
 * contains no runtime or SDK
 * information.
 */
export const GenerationCompatibilitySchema = z
  .object({
    /**
     * Supported AI providers.
     *
     * Examples:
     * - google
     * - openai
     * - anthropic
     */
    supportedProviders: z.array(z.string().min(1).max(50)).min(1).max(25),

    /**
     * Supported foundation models.
     *
     * Examples:
     * - gemini-2.5-pro
     * - gpt-5
     */
    supportedModels: z.array(z.string().min(1).max(100)).min(1).max(100),

    /**
     * Supported prompt template versions.
     *
     * Prompt versions are intentionally
     * independent from SDK versions.
     */
    supportedPromptVersions: z.array(PromptVersionSchema).min(1).max(100),
  })
  .strict()

/* -------------------------------------------------------------------------- */
/*                         Compatibility Matrix                               */
/* -------------------------------------------------------------------------- */

/**
 * Canonical Runtime compatibility matrix.
 *
 * This document represents the single source of truth
 * describing which platform components are allowed to
 * operate together.
 *
 * The Runtime periodically downloads the latest matrix
 * and validates itself before executing any generated
 * artifacts.
 */
export const CompatibilityMatrixBaseSchema = z
  .object({
    /**
     * Matrix identity.
     */
    metadata: CompatibilityMatrixMetadataSchema,

    /**
     * Runtime compatibility rules.
     */
    runtime: RuntimeCompatibilitySchema,

    /**
     * AI generation compatibility.
     */
    generation: GenerationCompatibilitySchema,

    /**
     * Supported adapters.
     */
    adapters: z
      .array(AdapterCompatibilitySchema)
      .superRefine((adapters, ctx) => {
        const seen = new Set<string>()

        for (const [index, adapter] of adapters.entries()) {
          if (seen.has(adapter.adapterId)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [index, 'adapterId'],
              message: 'Duplicate adapterId.',
            })

            continue
          }

          seen.add(adapter.adapterId)
        }
      })
      .default([]),

    /**
     * Revoked artifacts.
     */
    revocations: RevocationPolicySchema,

    /**
     * Upgrade recommendations.
     */
    recommendations: RuntimeRecommendationsSchema,
  })
  .strict()

export const CompatibilityMatrixSchema = CompatibilityMatrixBaseSchema.superRefine(
  (matrix, ctx) => {
    /* ------------------------------------------------ */
    /* Providers                                         */
    /* ------------------------------------------------ */

    const providers = new Set<string>()

    matrix.generation.supportedProviders.forEach((provider, index) => {
      if (providers.has(provider)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['generation', 'supportedProviders', index],
          message: 'Duplicate provider.',
        })

        return
      }

      providers.add(provider)
    })

    /* ------------------------------------------------ */
    /* Models                                            */
    /* ------------------------------------------------ */

    const models = new Set<string>()

    matrix.generation.supportedModels.forEach((model, index) => {
      if (models.has(model)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['generation', 'supportedModels', index],
          message: 'Duplicate model.',
        })

        return
      }

      models.add(model)
    })

    /* ------------------------------------------------ */
    /* Prompt Versions                                   */
    /* ------------------------------------------------ */

    const prompts = new Set<string>()

    matrix.generation.supportedPromptVersions.forEach((version, index) => {
      if (prompts.has(version)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['generation', 'supportedPromptVersions', index],
          message: 'Duplicate prompt version.',
        })

        return
      }

      prompts.add(version)
    })

    /* ------------------------------------------------ */
    /* Revoked Artifacts                                 */
    /* ------------------------------------------------ */

    const revoked = new Set<string>()

    matrix.revocations.revokedArtifacts.forEach((entry, index) => {
      if (revoked.has(entry.manifestHash)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['revocations', 'revokedArtifacts', index, 'manifestHash'],
          message: 'Duplicate revoked artifact.',
        })

        return
      }

      revoked.add(entry.manifestHash)
    })
  },
)
