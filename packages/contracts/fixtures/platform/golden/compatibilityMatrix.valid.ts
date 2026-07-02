import type { CompatibilityMatrix } from '../../../src/platform/compatibilityMatrix.types'

export const VALID_COMPATIBILITY_MATRIX: CompatibilityMatrix = {
  metadata: {
    schemaVersion: 1,
    publishedAt: 1782969600000,
  },

  runtime: {
    runtimeVersion: '2.0.0',

    supportedSdkVersions: '^2.0.0',

    supportedCompilerVersions: '^2.0.0',

    supportedManifestVersions: '^1.0.0',
  },

  generation: {
    supportedProviders: ['google', 'openai'],

    supportedModels: ['gemini-2.5-pro', 'gpt-5'],

    supportedPromptVersions: ['planner-v1', 'planner-v2'],
  },

  adapters: [
    {
      adapterId: 'github',

      version: '2.1.0',

      supportedVersions: '^2.0.0',

      deprecated: false,
    },

    {
      adapterId: 'jira',

      version: '1.4.0',

      supportedVersions: '^1.4.0',

      deprecated: true,

      deprecatedSince: '1.4.0',
    },
  ],

  revocations: {
    revokedArtifacts: [
      {
        manifestHash: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',

        reason: 'compiler_bug',

        revokedAt: 1782969600000,

        message: 'Compiler v2.0 generated invalid bundles.',
      },
    ],
  },

  recommendations: {
    latestRuntimeVersion: '2.2.0',

    latestSdkVersion: '2.2.0',

    latestCompilerVersion: '2.2.0',
  },
}
