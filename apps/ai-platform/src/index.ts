import { env, logger, getAIProvider, getStorageAdapter } from '@novus/shared'

function bootstrap(): void {
  try {
    logger.info('🚀 Booting AI Gateway...', { environment: env.NOVUS_ENV })

    // Validate the environment configuration
    // (We invoke them directly without assigning variables to satisfy TypeScript strict mode)
    getAIProvider()
    getStorageAdapter()

    logger.debug('Adapters initialized successfully.', {
      aiProvider: env.NOVUS_AI_PROVIDER,
      storageAdapter: env.NOVUS_STORAGE_ADAPTER,
    })

    logger.info('✅ Boot successful! The AI Gateway is ready.')
  } catch (error) {
    logger.fatal('❌ Failed to boot AI Gateway', error)
  }
}

bootstrap()
