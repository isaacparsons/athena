import postgres from 'postgres';

type IProvider = 'google';

export async function getCredentialsForProvider(
  db: postgres.Sql,
  credentials: Omit<DBFederatedCredentials, 'id' | 'userId'>
) {
  const [googleCredentials]: [DBFederatedCredentials] = await db`
    select *
    from public.federated_credentials
    where provider=${credentials.provider} and subject_id=${credentials.subjectId}
  `;
  return googleCredentials;
}

export async function createCredentialsForProvider(
  db: postgres.Sql,
  credentials: Omit<DBFederatedCredentials, 'id'>
) {
  const [googleCredentials]: [DBFederatedCredentials] = await db`
      insert into public.federated_credentials
        (provider, subject_id, user_id)
      values
        (${credentials.provider}, ${credentials.subjectId}, ${credentials.userId})
    returning *
    `;
  return googleCredentials;
}
