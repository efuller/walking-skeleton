import path from 'path';
import { setupEnvVars } from '@efuller/shared/tests/utils/setupEnvVars';
import {
  generateDrizzleKit,
  migrateDrizzleKit
} from '@efuller/shared/tests/utils/generateDrizzleKit';
import isCI from 'is-ci';
import execSh from 'exec-sh';

export default async function setupTestEnv() {
  console.time('globalSetup');
  if (!isCI) {
    setupEnvVars(`${__dirname}/.env.test`);
  }

  const out= await execSh.promise(
    `supabase start -x realtime,storage-api,imgproxy,inbucket,postgrest,edge-runtime,logflare,vector,supavisor`,
    {
      cwd: path.join(__dirname, 'supabase'),
    },
  );
  console.log(out.stdout, out.stderr);

  console.log('---------DB_URL---------', process.env.DATABASE_URL);

  await generateDrizzleKit(path.join(__dirname, '../../', 'api'));
  await migrateDrizzleKit(path.join(__dirname, '../../', 'api'));

  console.timeEnd('globalSetup');
  return true;
}

setupTestEnv();