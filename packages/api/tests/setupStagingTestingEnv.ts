import path from 'path';
import { generatePrismaClient } from '@efuller/shared/tests/utils/generatePrismaClient';
import { setupEnvVars } from '@efuller/shared/tests/utils/setupEnvVars';

export default async () => {
  const rootCwd = path.join(__dirname, '../');

  setupEnvVars('./packages/api/.env.test');
  await generatePrismaClient('.env.test', rootCwd);
};
