import type { JestConfigWithTsJest } from 'ts-jest';

export default async (): Promise<JestConfigWithTsJest> => ({
  displayName: 'Backend (infra)',
  testMatch: ['**/@(src|tests)/**/*.@(itest|ispec).*'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', {}],
  },
  globalSetup: './tests/setupLocalTestingEnv.ts',
});