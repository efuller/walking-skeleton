import { Config } from 'jest';

export default async (): Promise<Config> => ({
  verbose: true,
  maxWorkers: 1,
  testTimeout: 30000,
  projects: [
    {
      displayName: 'Backend-E2E',
      testMatch: ['**/@(src|tests)/**/*.@(e2e).*'],
      transform: {
        '^.+\\.(t|j)sx?$': ['ts-jest', {}],
      },
      globalSetup: './tests/setupLocalTestingEnv.ts',
      rootDir: '<rootDir>/packages/api'
    },
    {
      displayName: 'Frontend-E2E',
      preset: "jest-puppeteer",
      testMatch: ['**/@(src|tests)/**/*.@(e2e).*'],
      transform: {
        '^.+\\.(t|j)sx?$': ['ts-jest', {}],
      },
      rootDir: '<rootDir>/packages/web'
    }
  ]
})