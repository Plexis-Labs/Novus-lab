import { expectSchemaToFail, expectSchemaToPass, asUnknown } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import { createGenerationTraceFixture } from '../../../fixtures/ai/generationTrace.fixture'
import { GenerationTraceSchema } from '../../../src/ai/generationTrace.schema'

describe('GenerationTrace Security', () => {
  describe('privacy firewall', () => {
    it('rejects raw HTML', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          rawHtml: '<div>secret</div>',
        }),
      )
    })

    it('rejects workspace data', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          workspaceData: {
            notes: 'secret',
          },
        }),
      )
    })

    it('rejects browser cookies', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          cookies: 'session=abcdef',
        }),
      )
    })

    it('rejects local storage snapshots', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          localStorage: {
            token: 'secret',
          },
        }),
      )
    })

    it('rejects session storage snapshots', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          sessionStorage: {
            auth: 'secret',
          },
        }),
      )
    })

    it('rejects browser event objects', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          event: {
            target: {},
          },
        }),
      )
    })

    it('rejects arbitrary DOM snapshots', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          domSnapshot: '<body>...</body>',
        }),
      )
    })

    it('rejects clipboard contents', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          clipboard: 'super secret',
        }),
      )
    })

    it('rejects arbitrary request payloads', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          request: {
            body: '...',
          },
        }),
      )
    })

    it('rejects arbitrary response payloads', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          response: {
            body: '...',
          },
        }),
      )
    })
  })

  describe('diagnostic prompt protection', () => {
    it('allows diagnostic prompts only after explicit opt-in', () => {
      expectSchemaToPass(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          privacy: {
            ...createGenerationTraceFixture().privacy,
            hasUserOptIn: true,
            diagnosticPrompt: 'Investigate generation failure.',
          },
        }),
      )
    })

    it('rejects diagnostic prompts without opt-in', () => {
      expectSchemaToFail(
        GenerationTraceSchema,
        asUnknown({
          ...createGenerationTraceFixture(),
          privacy: {
            ...createGenerationTraceFixture().privacy,
            hasUserOptIn: false,
            diagnosticPrompt: 'Sensitive prompt',
          },
        }),
      )
    })
  })
})
