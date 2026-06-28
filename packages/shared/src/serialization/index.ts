import type { z } from 'zod'

export class SerializationError extends Error {
  constructor(public readonly cause: z.ZodError) {
    super('Contract serialization validation failed.')
    this.name = 'SerializationError'
  }
}

//Safely parses and strips extra fields to guarantee contract shapes.

export function serialize<T>(schema: z.ZodType<T>, data: unknown): string {
  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    throw new SerializationError(parsed.error)
  }
  return JSON.stringify(parsed.data)
}

//Safely parses stringified data back into a strict contract shape, rejecting missing/invalid fields.

export function deserialize<T>(schema: z.ZodType<T>, payload: string): T {
  try {
    const rawData: unknown = JSON.parse(payload)
    const parsed = schema.safeParse(rawData)

    if (!parsed.success) {
      throw new SerializationError(parsed.error)
    }
    return parsed.data
  } catch (error) {
    if (error instanceof SerializationError) throw error
    throw new Error('Invalid JSON payload provided to deserializer.')
  }
}
