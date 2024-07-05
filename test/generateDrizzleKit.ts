import execSh from 'exec-sh';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

import path from 'path';

export const generateDrizzleKit = async (
  rootCwd: string,
) => {
  console.log('-----------------------------------');
  console.log('Running Drizzle Kit Push...');
  console.log('-----------------------------------');

  const schemaPath = path.join(rootCwd, 'drizzle.config.ts');
  const out = await execSh.promise(
    `drizzle-kit push --config=${schemaPath}`,
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
