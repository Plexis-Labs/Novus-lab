import { clone, omit, expectSchemaToFail, asUnknown } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import checklistFixture from '../../../fixtures/ai/golden/microAppSpec.checklist.json'
import metricsFixture from '../../../fixtures/ai/golden/microAppSpec.metrics.json'
import { MicroAppSpecSchema } from '../../../src/ai/microAppSpec.schema'

function createChecklistFixture(): typeof checklistFixture {
  return clone(checklistFixture)
}

function createMetricsFixture(): typeof metricsFixture {
  return clone(metricsFixture)
}

describe('MicroAppSpecSchema', () => {
  describe('golden paths', () => {
    it('accepts a checklist specification', () => {
      expect(() => MicroAppSpecSchema.parse(createChecklistFixture())).not.toThrow()
    })

    it('accepts a metrics specification', () => {
      expect(() => MicroAppSpecSchema.parse(createMetricsFixture())).not.toThrow()
    })
  })

  describe('schema version', () => {
    it('rejects an unsupported schema version', () => {
      const spec = createChecklistFixture()

      spec.schemaVersion = 2

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })

    it('rejects a missing schemaVersion', () => {
      expect(() =>
        MicroAppSpecSchema.parse(omit(createChecklistFixture(), 'schemaVersion')),
      ).toThrow()
    })
  })

  describe('feature identifier', () => {
    it('rejects an invalid UUID', () => {
      const spec = createChecklistFixture()

      spec.featureId = 'feature-1'

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })

    it('rejects a missing featureId', () => {
      expect(() => MicroAppSpecSchema.parse(omit(createChecklistFixture(), 'featureId'))).toThrow()
    })
  })

  describe('default view', () => {
    it('rejects an empty defaultViewId', () => {
      const spec = createChecklistFixture()

      spec.defaultViewId = ''

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })

    it('rejects a missing defaultViewId', () => {
      expect(() =>
        MicroAppSpecSchema.parse(omit(createChecklistFixture(), 'defaultViewId')),
      ).toThrow()
    })
  })

  describe('views', () => {
    it('rejects an empty views array', () => {
      const spec = createChecklistFixture()

      spec.views = []

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })

    it('rejects a missing views collection', () => {
      expect(() => MicroAppSpecSchema.parse(omit(createChecklistFixture(), 'views'))).toThrow()
    })

    it('rejects more than twenty-five views', () => {
      const spec = createChecklistFixture()

      spec.views = Array.from({ length: 26 }, (_, index) => ({
        ...clone(spec.views[0]),
        id: `view${index}`,
      }))

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })
  })

  describe('view metadata', () => {
    it('rejects an empty view identifier', () => {
      const spec = createChecklistFixture()

      spec.views[0].id = ''

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })

    it('rejects an invalid view identifier', () => {
      const spec = createChecklistFixture()

      spec.views[0].id = '123-view'

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })

    it('rejects an unknown layout', () => {
      const spec = createChecklistFixture()

      spec.views[0].layout = 'columns'

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })

    it('rejects an empty widget collection', () => {
      const spec = createChecklistFixture()

      spec.views[0].widgets = []

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })

    it('rejects more than one hundred widgets', () => {
      const spec = createChecklistFixture()

      spec.views[0].widgets = Array.from({ length: 101 }, (_, index) => ({
        ...clone(spec.views[0].widgets[0]),
        id: `widget${index}`,
      }))

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })
  })
  describe('widget validation', () => {
    it('rejects an empty widget identifier', () => {
      const spec = createChecklistFixture()

      spec.views[0].widgets[0].id = ''

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })

    it('rejects an invalid widget identifier', () => {
      const spec = createChecklistFixture()

      spec.views[0].widgets[0].id = '!widget'

      expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
    })

    it('rejects an unknown visibility', () => {
      expectSchemaToFail(
        MicroAppSpecSchema,
        asUnknown({
          ...createChecklistFixture(),
          views: [
            {
              ...createChecklistFixture().views[0],
              widgets: [
                {
                  ...createChecklistFixture().views[0].widgets[0],
                  visibility: 'hidden',
                },
                ...createChecklistFixture().views[0].widgets.slice(1),
              ],
            },
          ],
        }),
      )
    })

    it('applies the default visibility', () => {
      const parsed = MicroAppSpecSchema.parse(createChecklistFixture())

      expect(parsed.views[0].widgets[0].visibility).toBe('always')
    })

    describe('data binding', () => {
      it('rejects an empty entity', () => {
        const spec = createChecklistFixture()

        const checklist = spec.views[0].widgets[1]

        if ('bind' in checklist && checklist.bind) {
          checklist.bind.entity = ''
        }

        expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
      })

      it('rejects an unknown collection type', () => {
        const spec = createChecklistFixture()

        const checklist = spec.views[0].widgets[1]

        if ('bind' in checklist && checklist.bind) {
          checklist.bind.collection = 'array'
        }

        expect(() => MicroAppSpecSchema.parse(spec)).toThrow()
      })
    })

    describe('action validation', () => {
      it('rejects an invalid action type', () => {
        expectSchemaToFail(
          MicroAppSpecSchema,
          asUnknown({
            ...createChecklistFixture(),
            views: [
              {
                ...createChecklistFixture().views[0],
                widgets: [
                  ...createChecklistFixture().views[0].widgets,
                  {
                    id: 'saveButton',
                    kind: 'button',
                    label: 'Save',
                    action: {
                      type: 'execute_script',
                    },
                  },
                ],
              },
            ],
          }),
        )
      })

      it('rejects an invalid URL', () => {
        expectSchemaToFail(
          MicroAppSpecSchema,
          asUnknown({
            ...createChecklistFixture(),
            views: [
              {
                ...createChecklistFixture().views[0],
                widgets: [
                  ...createChecklistFixture().views[0].widgets,
                  {
                    id: 'docsButton',
                    kind: 'button',
                    label: 'Open Docs',
                    action: {
                      type: 'open_url',
                      url: 'not-a-url',
                    },
                  },
                ],
              },
            ],
          }),
        )
      })
    })
  })
})
