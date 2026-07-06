export type SupportedHost = 'github' | 'leetcode' | 'youtube' | 'acme' | 'unknown'

export class EnvironmentDetector {
  public static detect(): SupportedHost {
    const host = window.location.hostname

    if (host.endsWith('github.com')) {
      return 'github'
    }

    if (host.endsWith('leetcode.com')) {
      return 'leetcode'
    }

    if (host.endsWith('youtube.com')) {
      return 'youtube'
    }

    if (host === 'localhost' || host === '127.0.0.1') {
      return 'acme'
    }

    return 'unknown'
  }
}
