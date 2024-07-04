import { DrizzleClient } from '@efuller/api/src/shared/persistence/drizzle/drizzleClient';
import { dbhealth } from '@efuller/api/src/shared/persistence/drizzle/schema';
import { generateRandomNumber } from '@efuller/api/src/modules/journals/adapters/inMemoryJournal.repo';

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

describe('Reset DB', () => {
  let drizzleClient: DrizzleClient;

  beforeAll(async () => {
    drizzleClient = await DrizzleClient.create();
  });

  afterAll(async () => {
    await drizzleClient.disconnect();
  });

  it('should reset the DB', async () => {
    const drizzle = drizzleClient.getClient();

    await drizzle.insert(dbhealth).values({ id: generateRandomNumber(), name: 'test2' });

    await drizzleClient.reset();

    const countAfterReset = await drizzle.select().from(dbhealth);

    expect(countAfterReset.length).toBe(0);
  });
});
