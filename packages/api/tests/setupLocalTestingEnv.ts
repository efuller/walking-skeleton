import path from 'path';
import { generatePrismaClient } from '@efuller/shared/tests/utils/generatePrismaClient';
import { startDockerDB } from '@efuller/shared/tests/utils/startDockerDB';
import { setupEnvVars } from '@efuller/shared/tests/utils/setupEnvVars';

export default async () => {
  const environment = process.env.NODE_ENV || 'development';
  console.log('[setupInfraTestingEnv] environment: ', environment);
  const rootCwd = path.join(__dirname, './api');
  await startDockerDB('docker-compose.test.yml', path.join(rootCwd, '../../'));
  setupEnvVars('./packages/api/.env.test');
  await generatePrismaClient('.env.test', rootCwd);
};
