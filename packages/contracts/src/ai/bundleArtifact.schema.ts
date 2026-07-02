import { z } from 'zod'

import { Sha256HashSchema, SignatureSchema } from '../primitives/hash.schema'
import { ArtifactIdSchema, FeatureIdSchema } from '../primitives/identifier.schema'
import { CompilerVersionSchema, SdkVersionSchema } from '../primitives/version.schema'

/**
 * Immutable artifact identity.
 *
 * This section uniquely identifies
 * a compiled feature bundle.
 *
 * No executable code or trust metadata
 * belongs here.
 */
export const ArtifactMetadataSchema = z
  .object({
    /**
     * Globally unique artifact identifier.
     */
    artifactId: ArtifactIdSchema,

    /**
     * Owning feature.
     */
    featureId: FeatureIdSchema,

    /**
     * Monotonically increasing
     * feature version.
     */
    featureVersion: z.number().int().positive(),
  })
  .strict()

/**
 * Executable bundle payload.
 *
 * Produced by the Trusted Compiler
 * and later verified by the runtime.
 */
export const BundlePayloadSchema = z
  .object({
    /**
     * Bundled JavaScript.
     *
     * This is the executable
     * entrypoint loaded into
     * the sandbox.
     */
    compiledJs: z.string().trim().min(10, 'Compiled JavaScript cannot be empty.'),

    /**
     * Optional compiled CSS.
     */
    compiledCss: z.string().trim().min(1).optional(),

    /**
     * Optional source map.
     *
     * Available only in
     * development builds.
     */
    sourceMap: z.string().trim().min(1).optional(),
  })
  .strict()

/**
 * Runtime compatibility metadata.
 *
 * Used before the sandbox
 * is launched.
 */
export const CompatibilitySchema = z
  .object({
    /**
     * Lowest supported SDK.
     */
    minimumSdkVersion: SdkVersionSchema,

    /**
     * Highest supported SDK.
     */
    maximumSdkVersion: SdkVersionSchema,

    /**
     * Runtime capabilities
     * required by this bundle.
     */
    requiredCapabilities: z.array(z.string()).min(1),
  })
  .strict()

/**
 * Compiler provenance.
 *
 * Describes the compiler
 * responsible for producing
 * this artifact.
 */
export const CompilerMetadataSchema = z
  .object({
    /**
     * Compiler version.
     */
    version: CompilerVersionSchema,

    /**
     * Build identifier.
     */
    buildId: z.string().min(1, 'Build ID cannot be empty.'),

    /**
     * Compilation timestamp.
     */
    compiledAt: z.number().int().positive(),
  })
  .strict()

/**
 * Cryptographic integrity
 * information.
 *
 * These hashes allow the runtime
 * to detect any modification to
 * the generated artifact before
 * sandbox execution.
 */
export const ArtifactIntegritySchema = z
  .object({
    /**
     * Hash of the original AI output
     * before compilation.
     */
    sourceHash: Sha256HashSchema,

    /**
     * Hash of the compiled
     * JavaScript bundle.
     */
    compiledHash: Sha256HashSchema,

    /**
     * Hash of the canonical
     * BundleArtifact manifest.
     *
     * This is the value signed
     * by the Trusted Gateway.
     */
    manifestHash: Sha256HashSchema,

    /**
     * Gateway signature.
     */
    signature: SignatureSchema,
  })
  .strict()

/**
 * Immutable executable artifact.
 *
 * Produced by the Trusted Compiler
 * and cryptographically signed by
 * the Trusted Novus Gateway.
 *
 * This object is the only executable
 * package trusted by the runtime.
 */
export const BundleArtifactBaseSchema = z
  .object({
    /**
     * Artifact identity.
     */
    metadata: ArtifactMetadataSchema,

    /**
     * Executable payload.
     */
    payload: BundlePayloadSchema,

    /**
     * Runtime compatibility.
     */
    compatibility: CompatibilitySchema,

    /**
     * Compiler provenance.
     */
    compiler: CompilerMetadataSchema,

    /**
     * Cryptographic proof.
     */
    integrity: ArtifactIntegritySchema,
  })
  .strict()

export type ArtifactMetadata = z.infer<typeof ArtifactMetadataSchema>

export type BundlePayload = z.infer<typeof BundlePayloadSchema>

export type Compatibility = z.infer<typeof CompatibilitySchema>

export type CompilerMetadata = z.infer<typeof CompilerMetadataSchema>

export type Signature = z.infer<typeof SignatureSchema>

export type ArtifactIntegrity = z.infer<typeof ArtifactIntegritySchema>

export type BundleArtifact = z.infer<typeof BundleArtifactSchema>

export const BundleArtifactSchema = BundleArtifactBaseSchema.superRefine((artifact, ctx) => {
  const capabilities = artifact.compatibility.requiredCapabilities

  if (new Set(capabilities).size !== capabilities.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['compatibility', 'requiredCapabilities'],
      message: 'requiredCapabilities must not contain duplicate values.',
    })
  }

  //
  // Future:
  //
  // - SDK compatibility validation
  // - Manifest verification
  // - Signature verification
  // - Compiler trust policy
  //
})
