/**
 * Explicitly casts a value to `unknown`.
 * * Use this in contract tests to simulate untrusted external input
 * entering the validation boundary (e.g., from an API or bridge message),
 * avoiding the use of inline `as unknown` or `const payload: unknown = ...`.
 */
export function asUnknown<T>(value: T): unknown {
  return value
}
