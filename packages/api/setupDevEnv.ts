import path from 'path';
import { setupEnvVars } from '@efuller/shared/tests/utils/setupEnvVars';
import {
  generateDrizzleKit,
  migrateDrizzleKit
} from '@efuller/shared/tests/utils/generateDrizzleKit';

export default async function setupDevEnv() {
  const rootCwd = path.join(__dirname);
  setupEnvVars('.env.development'); // This doesn't seem to be working or setting env vars for the server.
  await generateDrizzleKit(rootCwd);
  await migrateDrizzleKit(rootCwd);
}
setupDevEnv();