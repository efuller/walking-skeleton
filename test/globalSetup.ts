import path from 'path';
import { v2 as compose } from 'docker-compose';
import { setupEnvVars } from './setupEnvVars';
import { generateDrizzleKit } from './generateDrizzleKit';
import { isPortAvailable } from './detectPort';


export default async () => {
  console.time('globalSetup');
  setupEnvVars('./packages/api/.env.test');

  const port = Number(process.env.POSTGRES_PORT);

  const isDBPortAvailable = await isPortAvailable(port);
  console.log({isDBPortAvailable});

  if (isDBPortAvailable) {
    await compose.upAll({
      cwd: path.join(__dirname),
      config: path.join(__dirname, 'docker-compose.test.yml'),
      log: true,
    });

    await compose.exec(
      'test-database',
      ['sh', '-c', 'until pg_isready ; do sleep 1; done'],
      {
        cwd: path.join(__dirname),
        config: path.join(__dirname, 'docker-compose.test.yml'),
      }
    );

    await generateDrizzleKit(path.join(__dirname, '../', 'packages/api'));
  }

  console.timeEnd('globalSetup');
  return true;
}