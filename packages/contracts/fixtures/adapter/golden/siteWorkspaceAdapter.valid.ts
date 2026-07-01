import type { SiteWorkspaceAdapter } from '../../../src/adapter/siteWorkspaceAdapter.types'

export const validSiteWorkspaceAdapter: SiteWorkspaceAdapter = {
  version: '2.1.0',
  health: 'healthy',
  entities: ['issues', 'comments'],
  capabilities: ['read:issues', 'read:comments'],
  routes: ['/project/*', '/issues/:id'],
  collectors: ['issue_collector', 'comment_collector'],
}
