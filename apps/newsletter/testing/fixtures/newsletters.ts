import { dbClient } from '../../src/db/client';
import { Transaction } from '../../src/types/db';

export async function createNewsletter(userId: number, name: string) {
  return dbClient.transaction().execute(async (trx: Transaction) => {
    const newsletter = await trx
      .insertInto('newsletter')
      .values({
        name: name,
        created: new Date().toISOString(),
        creatorId: userId,
        ownerId: userId,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    await trx
      .insertInto('userNewsletter')
      .values({
        userId: userId,
        newsletterId: newsletter.id,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return newsletter;
  });
}
