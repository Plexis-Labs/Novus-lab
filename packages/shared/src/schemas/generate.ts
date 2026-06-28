import * as fs from 'fs'
import * as path from 'path'

import { zodToJsonSchema } from 'zod-to-json-schema'

import type { ZodSchema } from 'zod'

//Utility to convert Zod schemas to JSON schemas for the AI pipeline.

export function exportToJsonSchema(
  name: string,
  schema: ZodSchema<unknown>,
  outDir = './dist/schemas',
): void {
  const jsonSchema = zodToJsonSchema(schema, name)

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const filePath = path.join(outDir, `${name}.json`)
  fs.writeFileSync(filePath, JSON.stringify(jsonSchema, null, 2))
}
