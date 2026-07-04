export interface AIProvider {
  generate(prompt: string, context?: Record<string, unknown>): Promise<string>
  stream(prompt: string, onChunk: (chunk: string) => void): Promise<void>
}
