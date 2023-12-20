import path from 'path';
import { generatePrismaClient } from '@efuller/shared/tests/utils/generatePrismaClient';
import { setupEnvVars } from '@efuller/shared/tests/utils/setupEnvVars';

export default async () => {
  const environment = process.env.NODE_ENV || 'development';
  console.log('[setupInfraTestingEnv] environment: ', environment);

  const rootCwd = path.join(__dirname, './api');
  setupEnvVars(`./packages/api/.env.${environment}}`);
  await generatePrismaClient(`.env.${environment}`, rootCwd);
};
