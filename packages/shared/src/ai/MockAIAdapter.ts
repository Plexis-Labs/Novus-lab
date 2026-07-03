import { logger } from '../logger/logger'

import type { AIProvider } from './types'

export class MockAIAdapter implements AIProvider {
  constructor() {
    logger.info('Mock AI Adapter initialized. All requests will be intercepted locally.')
  }

  async generate(prompt: string, context?: Record<string, unknown>): Promise<string> {
    logger.debug('Mock AI processing prompt', { prompt, context })

    // Simulate network latency (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500))

    return `[MOCK RESPONSE]: I processed your prompt: "${prompt}". The system is running offline.`
  }

  async stream(prompt: string, onChunk: (chunk: string) => void): Promise<void> {
    logger.debug('Mock AI streaming started', { prompt })
    const text = 'This is a mocked stream response.'

    for (const char of text) {
      // eslint-disable-next-line no-await-in-loop -- Intentional sequential delay to simulate a real-time stream
      await new Promise((resolve) => setTimeout(resolve, 50))
      onChunk(char)
    }
  }
}
