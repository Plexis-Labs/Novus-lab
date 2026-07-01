export const invalidRouteAdapter = {
  version: '1.0', // Invalid: Not semantic
  match: {
    patterns: '/dashboard/*', // Invalid: Must be an array
  },
  // Missing extract, observe, and unmount
}
