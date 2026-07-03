import { MockAIAdapter } from './MockAIAdapter'
import { type AIProvider } from './types'
import { env } from '../env/envLoader'
import { AdapterError } from '../errors/NovusErrors'

export function getAIProvider(): AIProvider {
  switch (env.NOVUS_AI_PROVIDER) {
    case 'mock':
      return new MockAIAdapter()

    case 'openai':
      throw new AdapterError('OpenAI Provider not yet implemented.')

    case 'anthropic':
      throw new AdapterError('Anthropic Provider not yet implemented.')

    case 'gemini':
      throw new AdapterError('Gemini Provider not yet implemented.')

    default:
      // TypeScript now correctly infers env.NOVUS_AI_PROVIDER as 'never' here
      throw new AdapterError(`Provider ${String(env.NOVUS_AI_PROVIDER)} is not supported yet.`)
  }
}
