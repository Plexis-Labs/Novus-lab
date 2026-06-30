import { omit } from '@novus/shared'
import { describe, expect, it } from 'vitest'

import validFixture from '../../../fixtures/ai/golden/generationContext.valid.json'
import { GenerationContextSchema } from '../../../src/ai/generationContext.schema'

/**
 * Creates a deep clone of the fixture.
 * * Using JSON.parse/stringify strips away Vite's ES Module
 * proxies/getters that cause structuredClone to throw DataCloneError.
 */
function createContextFixture(): typeof validFixture {
  return JSON.parse(JSON.stringify(validFixture)) as typeof validFixture
}

describe('GenerationContextSchema', () => {
  describe('happy path', () => {
    it('accepts the canonical generation context', () => {
      expect(() => GenerationContextSchema.parse(createContextFixture())).not.toThrow()
    })
  })

  describe('clientRequestId', () => {
    it('rejects an invalid UUID', () => {
      const context = createContextFixture()

      context.clientRequestId = 'invalid-uuid'

      expect(() => GenerationContextSchema.parse(context)).toThrow()
    })

    it('rejects an empty UUID', () => {
      const context = createContextFixture()

      context.clientRequestId = ''

      expect(() => GenerationContextSchema.parse(context)).toThrow()
    })
  })

  describe('prompt', () => {
    it('rejects an empty prompt', () => {
      const context = createContextFixture()

      context.prompt = ''

      expect(() => GenerationContextSchema.parse(context)).toThrow()
    })

    it('accepts a prompt exactly 800 characters long', () => {
      const context = createContextFixture()

      context.prompt = 'A'.repeat(800)

      expect(() => GenerationContextSchema.parse(context)).not.toThrow()
    })

    it('rejects prompts longer than 800 characters', () => {
      const context = createContextFixture()

      context.prompt = 'A'.repeat(801)

      expect(() => GenerationContextSchema.parse(context)).toThrow()
    })
  })

  describe('selectedText', () => {
    it('accepts selected text exactly 4000 characters long', () => {
      const context = createContextFixture()

      context.selectedText = {
        ...context.selectedText,
        content: 'A'.repeat(4000),
        characterCount: 4000,
      }

      expect(() => GenerationContextSchema.parse(context)).not.toThrow()
    })

    it('rejects selected text larger than 4000 characters', () => {
      const context = createContextFixture()

      context.selectedText = {
        ...context.selectedText,
        content: 'A'.repeat(4001),
        characterCount: 4001,
      }

      expect(() => GenerationContextSchema.parse(context)).toThrow()
    })

    it('allows selectedText to be omitted', () => {
      const context = createContextFixture()

      const payload = omit(context, 'selectedText')

      expect(() => GenerationContextSchema.parse(payload)).not.toThrow()
    })
  })

  describe('privacy policy', () => {
    it('rejects selectedText when selectedTextAllowed is false', () => {
      const context = createContextFixture()

      context.dataPolicy.selectedTextAllowed = false

      expect(() => GenerationContextSchema.parse(context)).toThrow(
        /selectedText must be undefined when selectedTextAllowed is false/i,
      )
    })

    it('accepts selectedText when selectedTextAllowed is true', () => {
      const context = createContextFixture()

      context.dataPolicy.selectedTextAllowed = true

      expect(() => GenerationContextSchema.parse(context)).not.toThrow()
    })

    it('accepts omitted selectedText when selectedTextAllowed is false', () => {
      const context = createContextFixture()

      context.dataPolicy.selectedTextAllowed = false

      const payload = omit(context, 'selectedText')

      expect(() => GenerationContextSchema.parse(payload)).not.toThrow()
    })
  })
})
