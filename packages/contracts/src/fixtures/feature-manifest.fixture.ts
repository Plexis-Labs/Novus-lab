import type { FeatureManifest } from '../schemas'

// The "Golden Fixture" - a perfect, valid example
export const validFeatureManifest: FeatureManifest = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  version: '1.0.0',
  name: 'Data Collector Feature',
  description: 'Safely collects runtime data from the host workspace.',
  entryPoint: 'dist/index.js',
  capabilities: ['network:read', 'storage:write'],
}

// The "Poison Fixture" - intentionally broken to test validation rules
export const invalidFeatureManifest = {
  id: 'not-a-real-uuid', // Fails: Not UUIDv4
  version: '1.0', // Fails: Not semantic (x.y.z)
  name: 'No', // Fails: Under 3 characters
  entryPoint: 'src/index.ts', // Fails: Doesn't end in .js
}
