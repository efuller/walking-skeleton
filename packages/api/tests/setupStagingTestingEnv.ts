import path from 'path';
import { setupEnvVars } from '@efuller/shared/tests/utils/setupEnvVars';
import { generateDrizzleKit } from '@efuller/shared/tests/utils/generateDrizzleKit';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async () => {
  setupEnvVars('./packages/shared/tests/.env.test');
  await generateDrizzleKit('./packages/shared/tests/.env.test');
  await sleep(1000);
};
