import { z } from 'zod'

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
    artifactId: z.string().uuid(),

    /**
     * Owning feature.
     */
    featureId: z.string().uuid(),

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
    minimumSdkVersion: z.string(),

    /**
     * Highest supported SDK.
     */
    maximumSdkVersion: z.string(),

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
    version: z.string(),

    /**
     * Build identifier.
     */
    buildId: z.string(),

    /**
     * Compilation timestamp.
     */
    compiledAt: z.number().int().positive(),
  })
  .strict()

/**
 * Supported signing algorithms.
 *
 * The runtime uses this field
 * to determine how the signature
 * should be verified.
 */
export const SignatureAlgorithmSchema = z.enum(['ed25519'])

/**
 * Cryptographic signature
 * produced by the Trusted
 * Novus Gateway.
 *
 * The Gateway signs the
 * canonical BundleArtifact
 * manifest after successful
 * compilation.
 */
export const SignatureSchema = z
  .object({
    /**
     * Signing authority.
     *
     * Used to locate the
     * appropriate trusted
     * public key.
     */
    issuerId: z.string().min(1).max(100),

    /**
     * Public key identifier.
     *
     * Supports key rotation.
     */
    keyId: z.string().min(1).max(100),

    /**
     * Signature algorithm.
     */
    algorithm: SignatureAlgorithmSchema,

    /**
     * Encoded signature value.
     *
     * The runtime verifies this
     * against the manifest hash.
     */
    value: z.string().min(32),
  })
  .strict()

/**
 * Canonical SHA-256 digest.
 *
 * Stored as a lowercase
 * hexadecimal string.
 */
export const Sha256HashSchema = z
  .string()
  .regex(/^[a-f0-9]{64}$/i, 'Must be a valid SHA-256 hexadecimal digest.')

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
