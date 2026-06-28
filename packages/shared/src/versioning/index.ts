// Strict branding types to prevent accidental cross-assignment of versions.
export type SchemaVersion = string & { readonly __brand: unique symbol }
export type ContractVersion = string & { readonly __brand: unique symbol }
export type MigrationVersion = string & { readonly __brand: unique symbol }

//Factory utilities to safely create version strings.
export const createSchemaVersion = (version: string): SchemaVersion => version as SchemaVersion
export const createContractVersion = (version: string): ContractVersion =>
  version as ContractVersion
export const createMigrationVersion = (version: string): MigrationVersion =>
  version as MigrationVersion
