// src/background/index.ts
import { RuntimeKernel } from './kernel.js'

console.info('[Novus Runtime] Bootstrapping Service Worker...')

// Safely invoke the static bootstrapper
RuntimeKernel.bootstrap()
