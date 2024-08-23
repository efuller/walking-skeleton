import { Config } from 'jest';

export default async (): Promise<Config> => ({
  verbose: true,
  maxWorkers: 1,
  testTimeout: 30000,
  projects: [
    {
      displayName: 'api-unit',
      testMatch: ['**/@(src|tests)/**/*.@(unit).@(ts|tsx)'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {}],
      },
      rootDir: '<rootDir>/packages/api'
    },
    {
      displayName: 'api-e2e',
      testMatch: ['**/@(src|tests)/**/*.@(e2e).@(ts|tsx)'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {}],
      },
      globalSetup: '../shared/tests/globalSetup.ts',
      globalTeardown: '../shared/tests/globalTeardown.ts',
      rootDir: '<rootDir>/packages/api'
    },
    {
      displayName: 'api-infra',
      testMatch: ['**/@(src|tests)/**/*.@(infra).@(ts|tsx)'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {}],
      },
      rootDir: '<rootDir>/packages/api',
      globalSetup: '../shared/tests/globalSetup.ts',
      globalTeardown: '../shared/tests/globalTeardown.ts',
    },
    {
      displayName: 'api-staging-e2e',
      testMatch: ['**/@(src|tests)/**/*.@(e2e).@(ts|tsx)'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {}],
      },
      globalSetup: '../shared/tests/globalSetup.ts',
      globalTeardown: '../shared/tests/globalTeardown.ts',
      rootDir: '<rootDir>/packages/api',
    },
    {
      displayName: 'api-staging-infra',
      testMatch: ['**/@(src|tests)/**/*.@(infra).@(ts|tsx)'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {}],
      },
      rootDir: '<rootDir>/packages/api',
      globalSetup: './tests/setupStagingTestingEnv.ts',
    },
    {
      displayName: 'web-e2e',
      preset: "jest-puppeteer",
      testMatch: ['**/@(src|tests)/**/*.@(e2e).@(ts|tsx)'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {}],
      },
      rootDir: '<rootDir>/packages/web',
      globalSetup: '../shared/tests/globalSetup.ts',
      globalTeardown: '../shared/tests/globalTeardown.ts',
    },
    {
      displayName: 'web',
      preset: "ts-jest",
      testEnvironment: "jsdom",
      testMatch: ['**/@(src|tests)/**/*.@(spec|test).@(ts|tsx)'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {}],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      rootDir: '<rootDir>/packages/web'
    },
  ]
})