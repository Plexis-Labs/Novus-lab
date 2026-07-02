import { describe, it } from 'vitest'

describe('MicroAppSpec Integration', () => {
  describe('planner pipeline', () => {
    it.todo('accepts planner structured output and produces a valid MicroApp specification')

    it.todo('rejects planner output that violates the trusted UI DSL')
  })

  describe('trusted renderer', () => {
    it.todo('renders every supported widget kind')

    it.todo('renders multiple views correctly')

    it.todo('resolves defaultViewId during initial render')

    it.todo('resolves workspace data bindings')
  })

  describe('runtime actions', () => {
    it.todo('dispatches open_url actions through the runtime')

    it.todo('dispatches mutate_dataset actions through the runtime')

    it.todo('dispatches navigate_view actions through the runtime')
  })

  describe('workspace integration', () => {
    it.todo('binds widgets to workspace datasets')

    it.todo('updates bound widgets after dataset mutations')
  })

  describe('renderer lifecycle', () => {
    it.todo('hydrates persisted MicroApp specifications after browser restart')

    it.todo('gracefully rejects corrupted specifications')
  })
})
