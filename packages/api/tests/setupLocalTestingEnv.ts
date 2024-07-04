import path from 'path';
import { startDockerDB } from '@efuller/shared/tests/utils/startDockerDB';
import { setupEnvVars } from '@efuller/shared/tests/utils/setupEnvVars';
import { generateDrizzleKit } from '@efuller/shared/tests/utils/generateDrizzleKit';

export default async () => {
  const rootCwd = path.join(__dirname, '../');

  await startDockerDB('docker-compose.test.yml', rootCwd);
  setupEnvVars('./packages/api/.env.test');
  await generateDrizzleKit('.env.test', rootCwd);
};
