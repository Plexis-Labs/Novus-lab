export const invalidDatasetProvenance = {
  collectionMode: 'magic', // Invalid: Must be manual, automated, or hybrid
  adapterVersion: 'v1.2', // Invalid: Not valid semantic versioning (needs x.y.z)
  source: 'not-a-valid-url', // Invalid: Must be a URL
  // Missing timestamp
}
