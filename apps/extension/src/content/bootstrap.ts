const INJECTION_GUARD = '__NOVUS_CONTENT_SCRIPT_INITIALIZED__'

export class ContentBootstrap {
  public static verifySingleInjection(): boolean {
    if (Reflect.has(window, INJECTION_GUARD)) {
      console.debug('[Novus Content] Duplicate injection prevented.')
      return false
    }

    Reflect.defineProperty(window, INJECTION_GUARD, {
      value: true,
      configurable: false,
      enumerable: false,
      writable: false,
    })

    return true
    // Return value
  }
}
