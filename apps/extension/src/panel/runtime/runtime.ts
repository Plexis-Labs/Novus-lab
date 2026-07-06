/**
 * Panel Runtime
 *
 * Coordinates initialization of the Side Panel runtime.
 */
export class PanelRuntime {
  public static bootstrap(): void {
    console.info('[Novus Panel] Bootstrapping Panel Runtime...')
  }

  public static shutdown(): void {
    console.info('[Novus Panel] Shutting down Panel Runtime...')
  }
}
