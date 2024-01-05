import path from 'path';
import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

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
    },
    {
      displayName: 'api-infra',
      testMatch: ['**/@(src|tests)/**/*.@(infra).*'],
      transform: {
        '^.+\\.(t|j)sx?$': ['ts-jest', {}],
      },
      rootDir: '<rootDir>/packages/api',
      globalSetup: './tests/setupLocalTestingEnv.ts',
    },
    {
      displayName: 'api-staging-e2e',
      testMatch: ['**/@(src|tests)/**/*.@(e2e).*'],
      transform: {
        '^.+\\.(t|j)sx?$': ['ts-jest', {}],
      },
      rootDir: '<rootDir>/packages/api',
      globalSetup: './tests/setupStagingTestingEnv.ts',
    },
    {
      displayName: 'api-staging-infra',
      testMatch: ['**/@(src|tests)/**/*.@(infra).*'],
      transform: {
        '^.+\\.(t|j)sx?$': ['ts-jest', {}],
      },
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: path.resolve(__dirname, '../../'),
      }),
      rootDir: '<rootDir>/packages/api',
      globalSetup: './tests/setupStagingTestingEnv.ts',
    }
  ]
})