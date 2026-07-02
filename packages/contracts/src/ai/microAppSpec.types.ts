import type {
  ActionSchema,
  ButtonWidgetSchema,
  ChecklistWidgetSchema,
  DataBindingSchema,
  MetricWidgetSchema,
  MicroAppSpecBaseSchema,
  MicroAppSpecSchema,
  TextWidgetSchema,
  ViewSchema,
  WidgetBaseSchema,
  WidgetSchema,
  ViewLayoutSchema,
  WidgetKindSchema,
} from './microAppSpec.schema'
import type { z } from 'zod'

/**
 * Runtime binding between a widget and a
 * workspace entity.
 */
export type DataBinding = z.infer<typeof DataBindingSchema>

/**
 * Trusted runtime action emitted by widgets.
 */
export type Action = z.infer<typeof ActionSchema>

/**
 * Shared widget properties.
 */
export type WidgetBase = z.infer<typeof WidgetBaseSchema>

/**
 * Static text widget.
 */
export type TextWidget = z.infer<typeof TextWidgetSchema>

/**
 * Metric widget.
 */
export type MetricWidget = z.infer<typeof MetricWidgetSchema>

/**
 * Checklist widget.
 */
export type ChecklistWidget = z.infer<typeof ChecklistWidgetSchema>

/**
 * Button widget.
 */
export type ButtonWidget = z.infer<typeof ButtonWidgetSchema>

/**
 * Any renderable trusted widget.
 */
export type Widget = z.infer<typeof WidgetSchema>

/**
 * Renderable application view.
 */
export type View = z.infer<typeof ViewSchema>

/**
 * Base MicroApp specification.
 */
export type MicroAppSpecBase = z.infer<typeof MicroAppSpecBaseSchema>

/**
 * Fully validated trusted UI specification.
 */
export type MicroAppSpec = z.infer<typeof MicroAppSpecSchema>

export type WidgetKind = z.infer<typeof WidgetKindSchema>

export type ViewLayout = z.infer<typeof ViewLayoutSchema>
