import { z } from 'zod'

export const InstanceBindingSchema = z
  .object({
    /**
     * Chrome tab this token is bound to.
     */
    tabId: z.number().int().positive(),

    /**
     * Unique sandbox iframe instance.
     * Regenerated whenever the iframe is recreated.
     */
    iframeInstanceId: z.string().uuid(),

    /**
     * Monotonically increasing route generation.
     * Incremented whenever the trusted runtime
     * detects a route transition.
     */
    routeEpoch: z.number().int().nonnegative(),
  })
  .strict()

const MAX_CAPABILITY_TOKEN_LIFETIME_MS = 60 * 60 * 1000 // 1 hour

export const CapabilityTokenSchema = z
  .object({
    capabilityTokenId: z.string().uuid(),

    featureId: z.string().uuid(),

    featureVersion: z.number().int().positive(),

    binding: InstanceBindingSchema,

    capabilities: z.array(z.string()).min(1),

    issuedAt: z.number().int().positive(),

    expiresAt: z.number().int().positive(),

    signature: z.string(),
  })
  .strict()
  .refine((token) => token.expiresAt > token.issuedAt, {
    message: 'expiresAt must be greater than issuedAt',
    path: ['expiresAt'],
  })
  .refine((token) => token.expiresAt - token.issuedAt <= MAX_CAPABILITY_TOKEN_LIFETIME_MS, {
    message: 'Capability token lifetime exceeds maximum allowed duration.',
    path: ['expiresAt'],
  })
  .refine(
    (token) => {
      return new Set(token.capabilities).size === token.capabilities.length
    },
    {
      message: 'Capabilities must not contain duplicates.',
      path: ['capabilities'],
    },
  )
