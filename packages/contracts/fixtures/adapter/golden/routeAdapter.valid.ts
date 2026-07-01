import type { RouteAdapter } from '../../../src/adapter/routeAdapter.types'

export const validRouteAdapter: RouteAdapter = {
  version: '1.0.0',
  match: {
    patterns: ['/dashboard/*', '/settings/profile'],
    exact: false,
  },
  extract: {
    selectors: { userName: '#user-profile-name', userEmail: '.email-field' },
    required: ['userName'],
  },
  observe: {
    mutations: true,
    events: ['click', 'input'],
  },
  unmount: {
    cleanup: true,
  },
}
