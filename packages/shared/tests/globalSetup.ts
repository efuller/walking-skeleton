import isCI from 'is-ci';
import path from 'path';
import execSh from 'exec-sh';
import { generateDrizzleKit } from './utils/generateDrizzleKit';
import { setupEnvVars } from './utils/setupEnvVars';


export default async () => {
  console.time('globalSetup');
  if (!isCI) {
    setupEnvVars('./packages/shared/tests/.env.test');
  }

  const out = await execSh.promise(
    `supabase start -x realtime,storage-api,imgproxy,inbucket,postgrest,edge-runtime,logflare,vector,supavisor`,
    {
      cwd: path.join(__dirname, 'supabase'),
    },
  );
  console.log(out.stdout, out.stderr);

  await generateDrizzleKit(path.join(__dirname, '../../', 'api'));

  console.timeEnd('globalSetup');
  return true;
}