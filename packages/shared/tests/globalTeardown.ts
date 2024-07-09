import isCI from 'is-ci';
import { v2 as compose } from 'docker-compose';

import { DrizzleClient } from '@efuller/api/src/shared/persistence/drizzle/drizzleClient';

export default async () => {
  console.time('globalTeardown');

  if (isCI) {
    await compose.down({
      cwd: __dirname,
      config: __dirname + '/docker-compose.test.yml',
      log: true,
    });
  } else {
    // Randomly clear out the test db.
    if (Math.ceil(Math.random() * 10) === 10) {
      const dbClient = await DrizzleClient.create();

      await dbClient.reset();
      await dbClient.disconnect();
    }
  }

  console.timeEnd('globalTeardown');
}