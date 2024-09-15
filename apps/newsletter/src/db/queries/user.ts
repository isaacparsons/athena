import postgres from 'postgres';

// interface IUser {}

export async function getUserByEmail(db: postgres.Sql, email: string) {
  const [user]: [DBUser?] = await db`
    select *
    from public.users
    where email=${email}
  `;
  return user;
}

export async function createUser(
  db: postgres.Sql,
  userInput: Omit<DBUser, 'id'>
) {
  const [user]: [DBUser?] = await db`
    insert into public.users
      (first_name, last_name, email)
      values
      (${userInput.firstName}, ${userInput.lastName}, ${userInput.email})
    returning *
  `;
  if (!user) throw new Error('Unable to create user');
  return user;
}
