import { dbClient } from '../../db';

export async function createUser() {
  const testUserEmail = 'test@test.com';
  const existingUser = await dbClient
    .selectFrom('user')
    .selectAll()
    .where('user.email', '=', testUserEmail)
    .executeTakeFirst();

  if (existingUser) {
    return existingUser;
  }
  return dbClient
    .insertInto('user')
    .values({
      firstName: 'test',
      lastName: 'user',
      email: testUserEmail,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}
