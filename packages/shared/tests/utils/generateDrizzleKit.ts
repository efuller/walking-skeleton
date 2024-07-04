import execSh from 'exec-sh';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

import path from 'path';

export const generateDrizzleKit = async (
  envFile: string,
  rootCwd: string,
) => {
  console.log('-----------------------------------');
  console.log('Running Drizzle Kit Push...');
  console.log('-----------------------------------');

  const schemaPath = path.join(rootCwd, 'drizzle.config.ts');
  const envPath = path.join(rootCwd, envFile);
  const out = await execSh.promise(
    `dotenv -e ${envPath} -- drizzle-kit push --config=${schemaPath}`,
    {
      cwd: rootCwd,
    },
  );
  console.log(out.stdout, out.stderr);
  console.log('-----------------------------------');
  console.log('Drizzle Kit Push Complete!');
  console.log('-----------------------------------');

  await sleep(1000);
};
