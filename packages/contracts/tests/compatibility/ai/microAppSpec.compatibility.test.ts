import { describe, it } from 'vitest'

describe('MicroAppSpec Compatibility', () => {
  describe('schema evolution', () => {
    it.todo('supports forward-compatible widget additions')

    it.todo('supports deprecated widget migrations')

    it.todo('supports future schema versions')
  })

  describe('renderer compatibility', () => {
    it.todo('preserves renderer behavior across schema upgrades')

    it.todo('maintains default visibility semantics')
  })

  describe('planner compatibility', () => {
    it.todo('accepts planner outputs generated from previous schema revisions')

    it.todo('supports future planner capability negotiation')
  })

  describe('serialization compatibility', () => {
    it.todo('supports persisted MicroApp specifications created by older versions')
  })
})
