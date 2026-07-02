export interface MockProviderResponse {
  readonly id: string
  readonly content: string
  readonly provider: 'mock'
  readonly timestamp: string
}

export interface MockProviderOptions {
  readonly prompt: string
  readonly temperature?: number
  readonly maxTokens?: number
}

export function createMockProviderResponse(options: MockProviderOptions): MockProviderResponse {
  return {
    id: `mock-${Date.now()}`,
    content: `[mock] ${options.prompt}`,
    provider: 'mock',
    timestamp: new Date().toISOString(),
  }
}

export function generateMockResponse(options: MockProviderOptions): MockProviderResponse {
  return createMockProviderResponse(options)
}
