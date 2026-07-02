import type {
  AdapterVersionSchema,
  CompilerVersionSchema,
  ManifestVersionSchema,
  RuntimeVersionSchema,
  SdkVersionSchema,
  SemVerRangeSchema,
  SemVerSchema,
} from './version.schema'
import type { z } from 'zod'

export type SemVer = z.infer<typeof SemVerSchema>

export type SemVerRange = z.infer<typeof SemVerRangeSchema>

export type RuntimeVersion = z.infer<typeof RuntimeVersionSchema>

export type CompilerVersion = z.infer<typeof CompilerVersionSchema>

export type AdapterVersion = z.infer<typeof AdapterVersionSchema>

export type ManifestVersion = z.infer<typeof ManifestVersionSchema>

export type SdkVersion = z.infer<typeof SdkVersionSchema>
