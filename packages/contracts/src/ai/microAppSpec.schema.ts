import { z } from 'zod'

import { FeatureIdSchema, ViewIdSchema, WidgetIdSchema } from '../primitives/identifier.schema'

/**
 * Binds a widget to a workspace entity exposed by the
 * Runtime Collection Engine.
 *
 * Widgets never contain runtime data directly.
 * Instead they reference entities which are resolved
 * by the trusted renderer.
 */
export const DataBindingSchema = z
  .object({
    /**
     * Workspace entity identifier.
     *
     * Examples:
     * - pullRequestFile
     * - reviewComment
     * - repository
     */
    entity: z.string().min(1).max(100),

    /**
     * Optional field within the entity.
     *
     * Examples:
     * - status
     * - title
     * - author
     */
    field: z.string().min(1).max(100).optional(),

    /**
     * Determines whether the widget expects
     * a single object or an entire collection.
     */
    collection: z.enum(['single', 'list']),
  })
  .strict()

/**
 * Trusted runtime actions.
 *
 * Widgets never execute JavaScript directly.
 * They emit structured actions which are handled
 * by the Runtime Action Dispatcher.
 */
export const ActionSchema = z.discriminatedUnion('type', [
  z
    .object({
      type: z.literal('open_url'),

      url: z
        .string()
        .url()
        .refine(
          (value) => value.startsWith('https://') || value.startsWith('http://'),
          'Only HTTP(S) URLs are allowed.',
        ),
    })
    .strict(),

  z
    .object({
      type: z.literal('mutate_dataset'),

      entity: z.string().min(1),

      operation: z.enum(['update', 'delete']),
    })
    .strict(),

  z
    .object({
      type: z.literal('navigate_view'),

      targetViewId: z.string().min(1),
    })
    .strict(),
])

/**
 * Shared widget metadata.
 *
 * Every widget inherits these fields before
 * adding its own specialized configuration.
 */
export const WidgetBaseSchema = z
  .object({
    /**
     * Stable widget identifier.
     *
     * Used for reconciliation,
     * telemetry,
     * analytics,
     * runtime events.
     */
    id: WidgetIdSchema,

    /**
     * Optional workspace binding.
     */
    bind: DataBindingSchema.optional(),

    /**
     * Runtime visibility rule.
     */
    visibility: z.enum(['always', 'if_data_exists', 'if_empty']).default('always'),
  })
  .strict()

/**
 * Static text displayed by the trusted renderer.
 */
export const TextWidgetSchema = WidgetBaseSchema.extend({
  kind: z.literal('text'),

  /**
   * Literal text content.
   */
  content: z.string().min(1).max(5000),

  /**
   * Semantic typography.
   *
   * The renderer owns the styling.
   */
  variant: z.enum(['h1', 'h2', 'body', 'caption']).default('body'),
}).strict()

/**
 * Displays a numeric or textual metric.
 */
export const MetricWidgetSchema = WidgetBaseSchema.extend({
  kind: z.literal('metric'),

  /**
   * Human-readable metric title.
   */
  label: z.string().min(1).max(100),

  /**
   * Displayed metric value.
   *
   * Usually populated through a data binding.
   */
  value: z.string().min(1),

  /**
   * Optional trend indicator.
   */
  trend: z.enum(['up', 'down', 'neutral']).optional(),
}).strict()

/**
 * Displays a runtime-managed checklist.
 *
 * Items are resolved through the configured data binding.
 */
export const ChecklistWidgetSchema = WidgetBaseSchema.extend({
  kind: z.literal('checklist'),

  /**
   * Optional runtime action executed
   * when a checklist item is toggled.
   */
  onToggle: ActionSchema.optional(),
}).strict()

/**
 * Trusted button component.
 */
export const ButtonWidgetSchema = WidgetBaseSchema.extend({
  kind: z.literal('button'),

  /**
   * Button label.
   */
  label: z.string().min(1).max(100),

  /**
   * Trusted runtime action.
   */
  action: ActionSchema,

  /**
   * Semantic button style.
   */
  variant: z.enum(['primary', 'secondary', 'danger']).default('primary'),
}).strict()

/**
 * Every renderable widget supported by
 * the Trusted Renderer.
 */
export const WidgetSchema = z.discriminatedUnion('kind', [
  TextWidgetSchema,
  MetricWidgetSchema,
  ChecklistWidgetSchema,
  ButtonWidgetSchema,
])
export const WidgetKindSchema = z.enum(['text', 'metric', 'checklist', 'button'])

/**
 * Supported layouts for trusted renderer views.
 *
 * Layout controls structure only.
 * Spacing, responsiveness and styling remain
 * the responsibility of the renderer.
 */
export const ViewLayoutSchema = z.enum(['stack', 'grid'])

/**
 * A renderable application view.
 *
 * A MicroApp may expose multiple views that the
 * runtime can navigate between.
 */
export const ViewSchema = z
  .object({
    /**
     * Stable view identifier.
     */
    id: ViewIdSchema,

    /**
     * Human-readable title.
     */
    title: z.string().min(1).max(100).optional(),

    /**
     * Renderer layout strategy.
     */
    layout: ViewLayoutSchema,

    /**
     * Ordered widgets displayed in this view.
     */
    widgets: z.array(WidgetSchema).min(1).max(100),
  })
  .strict()
  .superRefine((view, ctx) => {
    const ids = new Set<string>()

    for (const widget of view.widgets) {
      if (ids.has(widget.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['widgets'],
          message: `Duplicate widget id '${widget.id}' detected.`,
        })
      }

      ids.add(widget.id)
    }
  })

/**
 * Current MicroApp specification version.
 *
 * This version governs the structure of the
 * trusted UI DSL consumed by the renderer.
 */
export const MicroAppSchemaVersionSchema = z.literal(1)

/**
 * Canonical trusted UI specification.
 *
 * A MicroAppSpec contains one or more views
 * composed entirely from trusted widgets.
 */
export const MicroAppSpecBaseSchema = z
  .object({
    /**
     * DSL version.
     */
    schemaVersion: MicroAppSchemaVersionSchema,

    /**
     * Owning feature.
     */
    featureId: FeatureIdSchema,

    /**
     * Renderable application views.
     */
    views: z.array(ViewSchema).min(1).max(25),

    /**
     * Initial view presented
     * by the runtime.
     */
    defaultViewId: z.string().min(1).max(100),
  })
  .strict()

export const MicroAppSpecSchema = MicroAppSpecBaseSchema.superRefine((spec, ctx) => {
  const viewIds = new Set<string>()

  for (const view of spec.views) {
    if (viewIds.has(view.id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['views'],
        message: `Duplicate view id '${view.id}' detected.`,
      })
    }

    viewIds.add(view.id)
  }

  if (!viewIds.has(spec.defaultViewId)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['defaultViewId'],
      message: 'defaultViewId must reference an existing view.',
    })
  }
})
