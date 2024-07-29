import isCI from 'is-ci';
import execSh from 'exec-sh';
import path from 'path';
import { DrizzleClient } from '@efuller/api/src/shared/persistence/dbConnection/adapters/drizzleClient';
import { generateDrizzleKit } from '@efuller/shared/tests/utils/generateDrizzleKit';

export default async () => {
  console.time('globalTeardown');

  if (isCI) {
    const out = await execSh.promise(
      `supabase stop`,
      {
        cwd: path.join(__dirname, 'supabase'),
      },
    );
    console.log(out.stdout, out.stderr);
  } else {
    // Randomly clear out the test db.
    if (Math.ceil(Math.random() * 10) === 10) {
      const dbClient = await DrizzleClient.create();
      await dbClient.disconnect();

      const out = await execSh.promise(
        `supabase db reset --local`,
        {
          cwd: path.join(__dirname, 'supabase'),
        },
      );
      console.log(out.stdout, out.stderr);

      await generateDrizzleKit(path.join(__dirname, '../../', 'api'));
    }
  }

  console.timeEnd('globalTeardown');
}