/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only
        'style', // Formatting (no logic change)
        'refactor', // Code change that is neither feat nor fix
        'perf', // Performance improvement
        'test', // Adding or correcting tests
        'build', // Build system or dependency changes
        'ci', // CI configuration changes
        'chore', // Other changes that don't modify src or test files
        'revert', // Revert a previous commit

        'contract', // Platform contract changes (manifests, schemas, types)
        'adr', // Architecture Decision Record
        'security', // Security fix or hardening
        'adapter', // Site adapter changes
        'release', // Release commit (automated)
      ],
    ],

    'scope-enum': [
      1,
      'always',
      [
        // Packages
        'shared',
        'contracts',
        'runtime',
        'sdk',
        'adapters',
        'validation',
        'ui',

        // Apps
        'extension',
        'ai-platform',
        'docs',

        // Tooling
        'tooling',
        'ci',
        'deps',
        'workspace',

        // Milestones (Phase 0)
        'phase0',
        'milestone-a',
        'milestone-b',
        'milestone-c',
        'milestone-d',
        'milestone-e',
        'milestone-f',
        'milestone-g',
      ],
    ],

    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 100],

    'body-max-line-length': [2, 'always', 250],

    'header-max-length': [2, 'always', 120],

    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
  },
  helpUrl: 'https://github.com/plexis-labs/novus/blob/main/CONTRIBUTING.md#commit-style',
}
