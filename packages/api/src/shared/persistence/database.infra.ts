import { DrizzleClient } from '@efuller/api/src/shared/persistence/drizzle/drizzleClient';

describe('Database', () => {
  let drizzleClient: DrizzleClient;

  beforeAll(async () => {
    drizzleClient = await DrizzleClient.create();
  });

  afterAll(async () => {
    await drizzleClient.disconnect();
  });

  it('should verify that the DB is online', async () => {
    const drizzleResult = await drizzleClient.isConnected();

    expect(drizzleResult).toBe(true);
  });
});
