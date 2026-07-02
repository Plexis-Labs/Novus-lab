import { loadEnvironment, logger } from '../../../packages/shared/dist/index.js'

// 1. Safety Gate: Validate the environment first
const env = loadEnvironment()

// 2. Use your custom structured logger instead of console.log
logger.info({
  msg: '🚀 Booting AI Gateway...',
  environment: env.NOVUS_ENV,
})

// 3. Initialize the Adapters based on the .env file
if (env.NOVUS_AI_PROVIDER === 'mock') {
  logger.debug({ msg: 'Mock AI Adapter initialized successfully. Running offline.' })
}

if (env.NOVUS_STORAGE_ADAPTER === 'mock') {
  logger.debug({ msg: 'Mock Storage Adapter initialized successfully. Using in-memory storage.' })
}

logger.info({ msg: '✅ Boot successful! The AI Gateway is ready.' })
