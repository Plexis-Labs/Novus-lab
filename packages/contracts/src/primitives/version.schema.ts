import { z } from 'zod'

/* -------------------------------------------------------------------------- */
/*                            Semantic Version                                */
/* -------------------------------------------------------------------------- */

/**
 * Canonical Semantic Version.
 *
 * Examples:
 *
 * 1.0.0
 * 2.4.1
 * 3.0.0-beta.2
 * 1.2.3+build.45
 */
export const SemVerSchema = z
  .string()
  .regex(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/,
    'Must be a valid Semantic Version.',
  )

/* -------------------------------------------------------------------------- */
/*                           Semantic Version Range                           */
/* -------------------------------------------------------------------------- */

/**
 * Semantic version range.
 *
 * Examples:
 *
 * ^1.0.0
 * ~2.1.0
 * >=3.0.0
 * <=5.2.1
 * *
 */
export const SemVerRangeSchema = z.string().trim().min(1, 'Version range cannot be empty.')

/* -------------------------------------------------------------------------- */
/*                            Domain Version Types                            */
/* -------------------------------------------------------------------------- */

/**
 * Runtime SDK version.
 */
export const SdkVersionSchema = SemVerSchema

/**
 * Compiler version.
 */
export const CompilerVersionSchema = SemVerSchema

/**
 * Runtime version.
 */
export const RuntimeVersionSchema = SemVerSchema

/**
 * Feature manifest version.
 */
export const ManifestVersionSchema = SemVerSchema

/**
 * Adapter version.
 */
export const AdapterVersionSchema = SemVerSchema

/**
 * Prompt template version.
 *
 * NOTE:
 * Prompt versions intentionally remain free-form.
 *
 * Examples:
 * - v1
 * - v2
 * - planner-2026-07
 */
export const PromptVersionSchema = z.string().trim().min(1).max(100)

/* -------------------------------------------------------------------------- */
/*                             Supported Ranges                               */
/* -------------------------------------------------------------------------- */

export const SupportedSdkRangeSchema = SemVerRangeSchema

export const SupportedCompilerRangeSchema = SemVerRangeSchema

export const SupportedManifestRangeSchema = SemVerRangeSchema

export const SupportedRuntimeRangeSchema = SemVerRangeSchema

export const SupportedAdapterRangeSchema = SemVerRangeSchema
