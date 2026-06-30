import { asUnknown } from '@novus/shared'
import { describe, expect, it } from 'vitest'

import validFixture from '../../../fixtures/ai/golden/generationContext.valid.json'
import { GenerationContextJsonSchema } from '../../../generated/generationContext.json-schema'
import { GenerationContextSchema } from '../../../src/ai/generationContext.schema'

/**
 * Creates a deep clone of the fixture.
 * * Using JSON.parse/stringify strips away Vite's ES Module
 * proxies/getters that cause structuredClone to throw DataCloneError.
 */
function createContextFixture(): typeof validFixture {
  return JSON.parse(JSON.stringify(validFixture)) as typeof validFixture
}

describe('GenerationContext Contract', () => {
  describe('canonical contract', () => {
    it('accepts the canonical generation context', () => {
      expect(() => GenerationContextSchema.parse(createContextFixture())).not.toThrow()
    })

    it('returns a strongly typed parsed object', () => {
      const parsed = GenerationContextSchema.parse(createContextFixture())

      expect(parsed).toStrictEqual(createContextFixture())
    })
  })

  describe('required root fields', () => {
    it('requires clientRequestId', () => {
      const context = createContextFixture()

      const { clientRequestId: _clientRequestId, ...payload } = context

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })

    it('requires prompt', () => {
      const context = createContextFixture()

      const { prompt: _prompt, ...payload } = context

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })

    it('requires adapter', () => {
      const context = createContextFixture()

      const { adapter: _adapter, ...payload } = context

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })

    it('requires dataPolicy', () => {
      const context = createContextFixture()

      const { dataPolicy: _datapolicy, ...payload } = context

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })

    it('requires promptVersion', () => {
      const context = createContextFixture()

      const { promptVersion: _promptVersion, ...payload } = context

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })

    it('requires generationMode', () => {
      const context = createContextFixture()

      const { generationMode: _generationMode, ...payload } = context

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })
  })

  describe('optional fields', () => {
    it('allows selectedText to be omitted', () => {
      const context = createContextFixture()

      const { selectedText: _selectedText, ...payload } = context

      expect(() => GenerationContextSchema.parse(payload)).not.toThrow()
    })

    it('allows empty dataset summaries', () => {
      const context = createContextFixture()

      context.existingDatasets = []

      expect(() => GenerationContextSchema.parse(context)).not.toThrow()
    })

    it('allows empty availableCapabilities', () => {
      const context = createContextFixture()

      context.availableCapabilities = []

      expect(() => GenerationContextSchema.parse(context)).not.toThrow()
    })

    it('allows empty allowedSurfaces', () => {
      const context = createContextFixture()

      context.allowedSurfaces = []

      expect(() => GenerationContextSchema.parse(context)).not.toThrow()
    })
  })

  describe('enumerations', () => {
    it('accepts every supported generation mode', () => {
      for (const mode of ['trusted_spec', 'generated_bundle'] as const) {
        const context = createContextFixture()

        context.generationMode = mode

        expect(() => GenerationContextSchema.parse(context)).not.toThrow()
      }
    })

    it('rejects unsupported generation modes', () => {
      const context = createContextFixture()

      context.generationMode = 'experimental'

      expect(() => GenerationContextSchema.parse(context)).toThrow()
    })

    it('accepts every allowed surface', () => {
      const context = createContextFixture()

      context.allowedSurfaces = ['side_panel', 'overlay', 'annotation']

      expect(() => GenerationContextSchema.parse(context)).not.toThrow()
    })

    it('rejects unsupported allowed surfaces', () => {
      const context = createContextFixture()

      context.allowedSurfaces = ['floating_window']

      expect(() => GenerationContextSchema.parse(context)).toThrow()
    })
  })

  describe('strict contract', () => {
    it('rejects unknown root properties', () => {
      const payload = {
        ...createContextFixture(),
        rawHtml: '<div>secret</div>',
      }

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })

    it('rejects unknown adapter properties', () => {
      const context = createContextFixture()

      const payload = {
        ...context,
        adapter: {
          ...context.adapter,
          injected: true,
        },
      }

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })

    it('rejects unknown selectedText properties', () => {
      const context = createContextFixture()

      if (!context.selectedText) {
        throw new Error('Golden fixture must contain selectedText.')
      }

      const payload = {
        ...context,
        selectedText: {
          ...context.selectedText,
          rawSelection: '<span>secret</span>',
        },
      }

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })

    it('rejects unknown dataset properties', () => {
      const context = createContextFixture()

      const payload = {
        ...context,
        existingDatasets: [
          {
            ...context.existingDatasets[0],
            rawRecords: [],
          },
        ],
      }

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })

    it('rejects unknown dataPolicy properties', () => {
      const context = createContextFixture()

      const payload = {
        ...context,
        dataPolicy: {
          ...context.dataPolicy,
          allowCookies: true,
        },
      }

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })
  })

  describe('adapter contract', () => {
    it('requires adapter id', () => {
      const context = createContextFixture()

      const { id: _id, ...adapter } = context.adapter

      expect(() =>
        GenerationContextSchema.parse({
          ...context,
          adapter,
        }),
      ).toThrow()
    })

    it('requires adapter version', () => {
      const context = createContextFixture()

      const { version: _version, ...adapter } = context.adapter

      expect(() =>
        GenerationContextSchema.parse({
          ...context,
          adapter,
        }),
      ).toThrow()
    })

    it('rejects unsupported maturity levels', () => {
      const context = createContextFixture()

      context.adapter.maturityLevel = 'L5'

      expect(() => GenerationContextSchema.parse(context)).toThrow()
    })

    it('rejects unsupported adapter health values', () => {
      const context = createContextFixture()

      context.adapter.health = 'offline'

      expect(() => GenerationContextSchema.parse(context)).toThrow()
    })
  })

  describe('dataset contract', () => {
    it('requires dataset identifiers to be UUIDs', () => {
      const context = createContextFixture()

      context.existingDatasets[0].id = 'invalid'

      expect(() => GenerationContextSchema.parse(context)).toThrow()
    })

    it('rejects negative record counts', () => {
      const context = createContextFixture()

      context.existingDatasets[0].recordCount = -1

      expect(() => GenerationContextSchema.parse(context)).toThrow()
    })

    it('rejects invalid completeness values', () => {
      const context = createContextFixture()

      const payload = asUnknown({
        ...context,
        existingDatasets: [
          {
            ...context.existingDatasets[0],
            completeness: 'pending',
          },
        ],
      })

      expect(() => GenerationContextSchema.parse(payload)).toThrow()
    })
  })

  describe('public contract stability', () => {
    it('produces identical output for identical input', () => {
      const first = GenerationContextSchema.parse(createContextFixture())

      const second = GenerationContextSchema.parse(createContextFixture())

      expect(first).toStrictEqual(second)
    })

    it('parses deterministically', () => {
      const context = createContextFixture()

      for (let index = 0; index < 10; index++) {
        expect(() => GenerationContextSchema.parse(context)).not.toThrow()
      }
    })
  })
})

it('exports a valid JSON schema', () => {
  expect(GenerationContextJsonSchema).toBeDefined()

  expect(GenerationContextJsonSchema).toHaveProperty('$schema')

  expect(GenerationContextJsonSchema).toHaveProperty('definitions')
})
