export const VALID_CAPABILITY_TOKEN = {
  capabilityTokenId: 'e5e9f7cb-5dd3-4d5a-bd17-8f8fd5bcb1cf',

  featureId: 'e0dc1f48-82db-4e27-9b13-1fbc0c8195f4',

  featureVersion: 1,

  binding: {
    tabId: 12,
    iframeInstanceId: 'fd7185d4-2cf5-44f7-bb69-6d98d14d80f5',
    routeEpoch: 4,
  },

  capabilities: ['workspace.read', 'storage.write'],

  issuedAt: 1700000000000,

  expiresAt: 1700003600000,

  signature: 'signed-runtime-token',
} as const

export const INVALID_UUID_TOKEN = {
  ...VALID_CAPABILITY_TOKEN,

  featureId: 'hello',
}

export const EMPTY_CAPABILITY_TOKEN = {
  ...VALID_CAPABILITY_TOKEN,

  capabilities: [],
}

export const DUPLICATE_CAPABILITY_TOKEN = {
  ...VALID_CAPABILITY_TOKEN,

  capabilities: ['workspace.read', 'workspace.read'],
}

export const INVALID_LIFETIME_TOKEN = {
  ...VALID_CAPABILITY_TOKEN,

  issuedAt: 1000,

  expiresAt: 1000 + 5 * 60 * 60 * 1000,
}

export const REVERSED_TIME_TOKEN = {
  ...VALID_CAPABILITY_TOKEN,

  issuedAt: 2000,

  expiresAt: 1000,
}

export const MISSING_BINDING_TOKEN = {
  ...VALID_CAPABILITY_TOKEN,

  binding: {
    tabId: 1,

    iframeInstanceId: VALID_CAPABILITY_TOKEN.binding.iframeInstanceId,
  },
}

export const EXTRA_PROPERTY_TOKEN = {
  ...VALID_CAPABILITY_TOKEN,

  hacker: true,
}
