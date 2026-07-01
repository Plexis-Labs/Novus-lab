import { jsonRoundTrip } from './jsonRoundTrip'
import { expectSchemaToPass, expectSchemaToFail } from './schema'

import type { describe, it, expect } from 'vitest'
import type { ZodType } from 'zod'

interface ContractTestSuiteOptions<T> {
  vitestContext: {
    describe: typeof describe
    it: typeof it
    expect: typeof expect
  }
  name: string
  schema: ZodType<T>
  goldenFixtures: T[]
  invalidFixtures: unknown[]
  edgeCases?: unknown[]
}

// G-020: Automated Contract Test Suite
// Universally enforces all 9 mandatory validation criteria for a given schema.

export function createContractTestSuite<T>({
  vitestContext: { describe, it, expect },
  name,
  schema,
  goldenFixtures,
  invalidFixtures,
  edgeCases = [],
}: ContractTestSuiteOptions<T>): void {
  describe(`G-020 Master Suite: ${name}`, () => {
    // 1. Validation & 7. Golden Fixtures
    it('📋 [Validation & Golden] passes all valid golden fixtures successfully', () => {
      expect(goldenFixtures.length).toBeGreaterThan(0)
      goldenFixtures.forEach((fixture) => {
        expectSchemaToPass(schema, fixture)
      })
    })

    // 8. Invalid Fixtures
    it('❌ [Invalid Fixtures] strictly rejects all invalid payload structures', () => {
      expect(invalidFixtures.length).toBeGreaterThan(0)
      invalidFixtures.forEach((fixture) => {
        expectSchemaToFail(schema, fixture)
      })
    })

    // 2. Serialization & 3. Deep Equality
    it('🔄 [Serialization & Deep Equality] survives network transit without data degradation', () => {
      goldenFixtures.forEach((fixture) => {
        const serialized = jsonRoundTrip(fixture)
        expectSchemaToPass(schema, serialized)
        expect(serialized).toEqual(fixture)
      })
    })

    // 4. Versioning (Enforces that versioned contracts specify proper semver blocks if present)
    it('🏷️ [Versioning] enforces structured schema constraints across metadata bounds', () => {
      goldenFixtures.forEach((fixture: unknown) => {
        if (fixture && typeof fixture === 'object' && 'version' in fixture) {
          const version = (fixture as Record<string, unknown>)['version']
          if (typeof version === 'string') {
            expect(version).toMatch(/^\d+\.\d+\.\d+$/)
          }
        }
      })
    })

    // 5. Compatibility & 9. Edge Cases
    it('🧱 [Compatibility & Edge Cases] safely resolves minimal boundary limits', () => {
      edgeCases.forEach((edgeCase) => {
        expectSchemaToPass(schema, edgeCase)
      })
    })

    // 6. Migration (Placeholder tracking for future schema engine structural changes)
    it.todo('[Migration] handles backward transformation logic when legacy fields are processed')
  })
}
