import { defineManifest } from '@crxjs/vite-plugin'

import packageJson from './package.json' with { type: 'json' }

const WORKSPACE_MATCHES: string[] = [
  'https://github.com/*',
  'https://*.leetcode.com/*',
  'https://www.youtube.com/*',
  'http://localhost:3000/*',
]

export default defineManifest(() => ({
  manifest_version: 3,

  name: 'Novus Lab',

  version: packageJson.version,

  description: 'AI-generated persistent micro-apps for supported websites.',

  minimum_chrome_version: '116',

  permissions: ['storage', 'sidePanel', 'scripting', 'activeTab'],

  host_permissions: WORKSPACE_MATCHES,

  action: {
    default_title: 'Novus Lab',
  },

  background: {
    service_worker: 'src/background/runtime.ts',
    type: 'module',
  },

  content_scripts: [
    {
      matches: WORKSPACE_MATCHES,
      js: ['src/content/index.ts'],
      run_at: 'document_idle',
    },
  ],

  side_panel: {
    default_path: 'src/panel/index.html',
  },

  web_accessible_resources: [
    {
      resources: ['src/sandbox/index.html'],
      matches: WORKSPACE_MATCHES,
    },
  ],

  // icons: {
  //   "16": "assets/icons/icon-16.png",
  //   "32": "assets/icons/icon-32.png",
  //   "48": "assets/icons/icon-48.png",
  //   "128": "assets/icons/icon-128.png",
  // },

  content_security_policy: {
    extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
  },
}))
