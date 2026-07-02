import { z } from 'zod'

/* -------------------------------------------------------------------------- */
/*                         Runtime Recommendations                            */
/* -------------------------------------------------------------------------- */

import {
  RuntimeVersionSchema,
  SdkVersionSchema,
  CompilerVersionSchema,
} from '../primitives/version.schema'

/**
 * Recommended platform versions.
 *
 * Unlike compatibility, these values are
 * advisory rather than mandatory.
 *
 * They allow the Runtime to notify users
 * about newer platform releases without
 * breaking compatibility.
 */
export const RuntimeRecommendationsSchema = z
  .object({
    /**
     * Latest recommended Runtime.
     */
    latestRuntimeVersion: RuntimeVersionSchema,

    /**
     * Latest recommended SDK.
     */
    latestSdkVersion: SdkVersionSchema,

    /**
     * Latest recommended Compiler.
     */
    latestCompilerVersion: CompilerVersionSchema,
  })
  .strict()
