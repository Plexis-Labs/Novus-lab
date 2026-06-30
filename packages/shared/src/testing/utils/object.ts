export function omit<T extends Record<PropertyKey, unknown>, K extends keyof T>(
  object: T,
  key: K,
): Omit<T, K> {
  const clone = { ...object }

  Reflect.deleteProperty(clone, key)

  return clone
}
