/**
 * Simulates network or bridge transit by serializing a value to JSON
 * and parsing it back.
 * * Use this to verify that contract payloads survive serialization without
 * losing critical data or retaining forbidden runtime objects (like Dates or Maps).
 */
export function jsonRoundTrip<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}
