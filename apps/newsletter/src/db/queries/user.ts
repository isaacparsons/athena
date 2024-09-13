import postgres from 'postgres';

export async function getUser(db: postgres.Sql) {
  return await db`
    select
      first_name,
      last_name
    from public.users
  `;
}
