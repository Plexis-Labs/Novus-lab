import type { WorkspaceDataset } from '../../src/workspace/workspaceDataset.schema'

export const validWorkspaceDataset: WorkspaceDataset = {
  version: '1.0.0',
  entity: 'customer_tickets',
  coverage: {
    isComplete: true,
    totalCount: 2,
    extractedCount: 2,
  },
  metadata: {
    sourceUrl: 'https://api.workspace.com/v1/tickets',
    extractedAt: new Date().toISOString(),
  },
  records: [
    { id: 't-001', status: 'open', priority: 'high' },
    { id: 't-002', status: 'closed', priority: 'low' },
  ],
}

export const invalidWorkspaceDataset = {
  version: '1.0', // Fails: Not semantic
  entity: '', // Fails: Empty string
  coverage: {
    isComplete: false,
    totalCount: 10,
    extractedCount: 15, // Fails: Refinement rule (extracted > total)
  },
  records: 'not-an-array', // Fails: Must be an array of objects
}
