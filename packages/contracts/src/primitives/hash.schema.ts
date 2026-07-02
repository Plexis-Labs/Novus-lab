import { z } from 'zod'

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
