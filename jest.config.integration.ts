import { Config } from 'jest';

export default async (): Promise<Config> => ({
  verbose: true,
  projects: ['./packages/api/jest.config.integration.ts']
})