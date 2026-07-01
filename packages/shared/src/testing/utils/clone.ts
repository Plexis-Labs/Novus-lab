/**
 * Creates a deep copy of the provided value using the native structuredClone API.
 * * Use this to safely duplicate golden fixtures before mutating them for
 * invalidation testing, ensuring cross-test state remains isolated.
 */
export function clone<T>(value: T): T {
  return structuredClone(value)
}
