import { PrismaDbClient } from './prisma/prismaDbClient';
import { DrizzleClient } from '@efuller/api/src/shared/persistence/drizzle/drizzleClient';
import { DBHealth } from '@efuller/api/src/shared/persistence/drizzle/schema';

describe('Database', () => {
  let db: PrismaDbClient;
  let drizzleClient: DrizzleClient;

  beforeAll(async () => {
    db = new PrismaDbClient();
    drizzleClient = await DrizzleClient.create();
  });

  afterAll(async () => {
    await db.disconnect();
    await drizzleClient.disconnect();
  });

  it('should verify that the DB is online', async () => {
    const result = await db.isConnected();
    const drizzleResult = await drizzleClient.isConnected();

    expect(result).toBe(true);
    expect(drizzleResult).toBe(true);
  });
});

describe('Reset DB', () => {
  let db: PrismaDbClient;
  let drizzleClient: DrizzleClient;

  beforeAll(async () => {
    db = new PrismaDbClient();
    drizzleClient = await DrizzleClient.create();
  });

  afterAll(async () => {
    await db.disconnect();
    await drizzleClient.disconnect();
  });

  it('should reset the DB', async () => {
    const dbClient = db.getClient();
    const drizzle = drizzleClient.getClient();


    await drizzle.insert(DBHealth).values({ id: 'asdf', name: 'test2' });
    await dbClient.dBHealth.create({
      data: {
        name: 'test',
      },
    });

    const count = await dbClient.dBHealth.count();

    // Anchor
    expect(count).toBeGreaterThan(0);

    await db.reset();

    const countAfterReset = await dbClient.dBHealth.count();

    expect(countAfterReset).toBe(0);
  });
});
