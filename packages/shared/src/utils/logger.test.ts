import { describe, expect, it, vi } from 'vitest'

import { createLogger, type StructuredLogEntry } from './logger'

describe('logger', () => {
  it('emits structured entries through the provided transport', () => {
    const transport = vi.fn<(entry: StructuredLogEntry) => void>()
    const logger = createLogger({ name: 'tests', transport })

    logger.info('hello', { requestId: 'abc' })

    expect(transport).toHaveBeenCalledTimes(1)
    const entry = transport.mock.calls[0]?.[0]

    expect(entry).toBeDefined()
    expect(entry).toMatchObject({
      level: 'info',
      message: 'hello',
      logger: 'tests',
      context: { requestId: 'abc' },
    })
    expect(entry?.timestamp).toEqual(expect.any(String))
  })

  it('suppresses messages below the configured level', () => {
    const transport = vi.fn<(entry: StructuredLogEntry) => void>()
    const logger = createLogger({ level: 'warn', transport })

    logger.debug('debug message')
    logger.warn('warn message')

    expect(transport).toHaveBeenCalledTimes(1)
    const entry = transport.mock.calls[0]?.[0]

    expect(entry).toBeDefined()
    expect(entry).toMatchObject({ level: 'warn' })
  })
})
