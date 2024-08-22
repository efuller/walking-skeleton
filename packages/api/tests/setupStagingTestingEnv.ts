import path from 'path';
import { setupEnvVars } from '@efuller/shared/tests/utils/setupEnvVars';
import { generateDrizzleKit } from '@efuller/shared/tests/utils/generateDrizzleKit';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async () => {
  const rootCwd = path.join(__dirname, '../');

  setupEnvVars('./packages/api/.env.test');
  await generateDrizzleKit(path.join(rootCwd, '.env.test'));
  await sleep(1000);
};
