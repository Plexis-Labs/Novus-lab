import { describe, expect, it } from 'vitest'

import validFixture from '../../../fixtures/ai/golden/generationContext.valid.json'
import { GenerationContextSchema } from '../../../src/ai/generationContext.schema'

function createContextFixture(): typeof validFixture {
  return structuredClone(validFixture)
}

function jsonRoundTrip(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value))
}

describe('GenerationContext Serialization', () => {
  describe('round-trip serialization', () => {
    it('survives JSON serialization without information loss', () => {
      const original = createContextFixture()

      const restored = jsonRoundTrip(original)

      const parsed = GenerationContextSchema.parse(restored)

      expect(parsed).toStrictEqual(original)
    })

    it('preserves nested adapter state', () => {
      const restored = jsonRoundTrip(createContextFixture())

      const parsed = GenerationContextSchema.parse(restored)

      expect(parsed.adapter).toStrictEqual(validFixture.adapter)
    })

    it('preserves selected text', () => {
      const restored = jsonRoundTrip(createContextFixture())

      const parsed = GenerationContextSchema.parse(restored)

      expect(parsed.selectedText).toStrictEqual(validFixture.selectedText)
    })

    it('preserves dataset summaries', () => {
      const restored = jsonRoundTrip(createContextFixture())

      const parsed = GenerationContextSchema.parse(restored)

      expect(parsed.existingDatasets).toStrictEqual(validFixture.existingDatasets)
    })

    it('preserves capabilities', () => {
      const restored = jsonRoundTrip(createContextFixture())

      const parsed = GenerationContextSchema.parse(restored)

      expect(parsed.availableCapabilities).toStrictEqual(validFixture.availableCapabilities)
    })

    it('preserves allowed surfaces', () => {
      const restored = jsonRoundTrip(createContextFixture())

      const parsed = GenerationContextSchema.parse(restored)

      expect(parsed.allowedSurfaces).toStrictEqual(validFixture.allowedSurfaces)
    })

    it('preserves data policy', () => {
      const restored = jsonRoundTrip(createContextFixture())

      const parsed = GenerationContextSchema.parse(restored)

      expect(parsed.dataPolicy).toStrictEqual(validFixture.dataPolicy)
    })
  })

  describe('determinism', () => {
    it('produces identical JSON for identical payloads', () => {
      const first = JSON.stringify(createContextFixture())

      const second = JSON.stringify(createContextFixture())

      expect(first).toBe(second)
    })

    it('can be serialized repeatedly', () => {
      const context = createContextFixture()

      for (let index = 0; index < 10; index++) {
        const restored = jsonRoundTrip(context)

        expect(() => GenerationContextSchema.parse(restored)).not.toThrow()
      }
    })
  })

  describe('schema validation after transport', () => {
    it('still validates after transport', () => {
      const restored = jsonRoundTrip(createContextFixture())

      expect(() => GenerationContextSchema.parse(restored)).not.toThrow()
    })
  })
})
