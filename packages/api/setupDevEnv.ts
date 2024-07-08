import path from 'path';
import { startDockerDB } from '@efuller/shared/tests/utils/startDockerDB';
import { setupEnvVars } from '@efuller/shared/tests/utils/setupEnvVars';
import { generateDrizzleKit } from '@efuller/shared/tests/utils/generateDrizzleKit';

// Let's move and organize things into shared. No need to have that top level test folder.
export default async function setupDevEnv() {
  const rootCwd = path.join(__dirname);
  await startDockerDB('docker-compose.develop.yml', rootCwd);
  setupEnvVars('.env.development'); // This doesn't seem to be working or setting env vars for the server.
  await generateDrizzleKit(rootCwd);
}
setupDevEnv();