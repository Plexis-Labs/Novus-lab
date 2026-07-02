import { MockAIAdapter } from './MockAIAdapter'
import { type AIProvider } from './types'
import { env } from '../env/envLoader'
import { AdapterError } from '../errors/NovusErrors'

export function getAIProvider(): AIProvider {
  switch (env.NOVUS_AI_PROVIDER) {
    case 'mock':
      return new MockAIAdapter()

    case 'openai':
      // We will fill this in later, but the structure is ready!
      throw new AdapterError('OpenAI Provider not yet implemented.')

    default:
      throw new AdapterError(`Provider ${env.NOVUS_AI_PROVIDER} is not supported yet.`)
  }
}
