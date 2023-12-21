import path from 'path';
import { generatePrismaClient } from '@efuller/shared/tests/utils/generatePrismaClient';
import { startDockerDB } from '@efuller/shared/tests/utils/startDockerDB';
import { setupEnvVars } from '@efuller/shared/tests/utils/setupEnvVars';

export default async function setupDevEnv() {
  const rootCwd = path.join(__dirname);
  console.log('rootCwd: ', rootCwd);
  await startDockerDB('docker-compose.develop.yml', rootCwd);
  setupEnvVars('./packages/api/.env.development');
  await generatePrismaClient('.env.development', rootCwd);
}
setupDevEnv();