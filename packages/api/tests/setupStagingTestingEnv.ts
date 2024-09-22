import path from 'path';
import { setupEnvVars } from '@efuller/shared/tests/utils/setupEnvVars';
import { generateDrizzleKit, migrateDrizzleKit } from '@efuller/shared/tests/utils/generateDrizzleKit';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async () => {
  const rootCwd = path.join(__dirname, '../');
  const envFile = path.join(__dirname, '../../', 'shared/tests/', '.env.test');

  setupEnvVars(envFile);
  await generateDrizzleKit(rootCwd);
  await migrateDrizzleKit(rootCwd);
  await sleep(1000);
};
