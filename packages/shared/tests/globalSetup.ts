import isCI from 'is-ci';
import path from 'path';
import execSh from 'exec-sh';
import { generateDrizzleKit } from './utils/generateDrizzleKit';
// import { isPortAvailable } from './utils/detectPort';
import { setupEnvVars } from './utils/setupEnvVars';


export default async () => {
  console.time('globalSetup');
  if (!isCI) {
    setupEnvVars('./packages/shared/tests/.env.test');
  }

  // const port = Number(process.env.POSTGRES_PORT);

  // const isDBPortAvailable = await isPortAvailable(port);

  // if (isDBPortAvailable) {
  const out = await execSh.promise(
    `supabase start -x realtime,storage-api,imgproxy,inbucket,postgrest,edge-runtime,logflare,vector,supavisor`,
    {
      cwd: path.join(__dirname, 'supabase'),
    },
  );
  console.log(out.stdout, out.stderr);
  // }

  await generateDrizzleKit(path.join(__dirname, '../../', 'api'));

  console.timeEnd('globalSetup');
  return true;
}