import { Config } from 'jest';

export default async (): Promise<Config> => ({
  verbose: true,
  maxWorkers: 1,
  testTimeout: 30000,
  projects: [
    {
      displayName: 'backend-e2e',
      testMatch: ['**/@(src|tests)/**/*.@(e2e).*'],
      transform: {
        '^.+\\.(t|j)sx?$': ['ts-jest', {}],
      },
      globalSetup: './tests/setupLocalTestingEnv.ts',
      rootDir: '<rootDir>/packages/api'
    },
    {
      displayName: 'frontend-e2e',
      preset: "jest-puppeteer",
      testMatch: ['**/@(src|tests)/**/*.@(e2e).*'],
      transform: {
        '^.+\\.(t|j)sx?$': ['ts-jest', {}],
      },
      rootDir: '<rootDir>/packages/web'
    }
  ]
})