import * as dotenv from 'dotenv';
import path from 'path';

export const setupEnvVars = (envFile: string) => {
  console.log('-----------------------------------');
  console.log('Loading env vars from ', envFile);
  console.log('-----------------------------------');

  console.log('----Resolved path----', path.join(envFile, '../'));

  dotenv.config({ path: path.join(envFile, '../') });

  console.log('-----------------------------------');
  console.log(`The connection URL for the DB is: ${process.env.DATABASE_URL}`);
  console.log('-----------------------------------');
};
