import { asUnknown, clone, expectSchemaToFail, expectSchemaToPass } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import checklistFixture from '../../../fixtures/ai/golden/microAppSpec.checklist.json'
import { MicroAppSpecSchema } from '../../../src/ai/microAppSpec.schema'

function createChecklistFixture(): typeof checklistFixture {
  return clone(checklistFixture)
}

describe('MicroAppSpec Security', () => {
  it('accepts a valid trusted specification', () => {
    expectSchemaToPass(MicroAppSpecSchema, createChecklistFixture())
  })

  it('rejects undocumented widget kinds', () => {
    expectSchemaToFail(
      MicroAppSpecSchema,
      asUnknown({
        ...createChecklistFixture(),
        views: [
          {
            ...createChecklistFixture().views[0],
            widgets: [
              {
                id: 'iframe',
                kind: 'iframe',
                src: 'https://evil.com',
              },
            ],
          },
        ],
      }),
    )
  })

  it('rejects HTML widget injection', () => {
    expectSchemaToFail(
      MicroAppSpecSchema,
      asUnknown({
        ...createChecklistFixture(),
        views: [
          {
            ...createChecklistFixture().views[0],
            widgets: [
              {
                id: 'html',
                kind: 'html',
                html: '<script>alert(1)</script>',
              },
            ],
          },
        ],
      }),
    )
  })

  it('rejects arbitrary styling', () => {
    expectSchemaToFail(
      MicroAppSpecSchema,
      asUnknown({
        ...createChecklistFixture(),
        views: [
          {
            ...createChecklistFixture().views[0],
            widgets: [
              {
                id: 'title',
                kind: 'text',
                content: 'Hello',
                style: {
                  color: 'red',
                },
              },
            ],
          },
        ],
      }),
    )
  })

  it('rejects JavaScript execution actions', () => {
    expectSchemaToFail(
      MicroAppSpecSchema,
      asUnknown({
        ...createChecklistFixture(),
        views: [
          {
            ...createChecklistFixture().views[0],
            widgets: [
              {
                id: 'button',
                kind: 'button',
                label: 'Hack',

                action: {
                  type: 'eval',
                  script: 'alert(document.cookie)',
                },
              },
            ],
          },
        ],
      }),
    )
  })

  it('rejects browser API actions', () => {
    expectSchemaToFail(
      MicroAppSpecSchema,
      asUnknown({
        ...createChecklistFixture(),
        views: [
          {
            ...createChecklistFixture().views[0],
            widgets: [
              {
                id: 'button',
                kind: 'button',
                label: 'Clipboard',

                action: {
                  type: 'clipboard.write',
                },
              },
            ],
          },
        ],
      }),
    )
  })
})
