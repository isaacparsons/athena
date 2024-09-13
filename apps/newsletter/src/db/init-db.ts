import postgres from 'postgres';
import { parseCsvFile } from '../util/parse-csv';

export async function createTables(db: postgres.Sql) {
  console.log('creating public.users table');
  const users = await db`
  create table if not exists public.users(
      id serial primary key,
      first_name varchar(255),
      last_name varchar(255),
      email varchar(255)
  )
`;
  console.log('creating public.newsletters table');
  const newsletters = await db`
    create table if not exists public.newsletters(
        id serial primary key,
        name varchar(255),
        created timestamp with time zone,
        modified timestamp with time zone,
        owner_id integer references users (id)
    )
`;
  console.log('creating public.user_newsletters table');
  const userNewsletters = await db`
    create table if not exists public.user_newsletters(
        user_id integer references users (id),
        newsletter_id integer references newsletters (id)
    )
`;
  console.log('creating public.countries table');
  const countries = await db`
    create table if not exists public.countries(
        code varchar(255) primary key,
        name varchar(255),
        longitude double precision,
        lattitude double precision
    )
  `;
  console.log('creating public.locations table');
  const locations = await db`
    create table if not exists public.locations(
        id serial primary key,
        name varchar(255),
        country_code varchar(255) references countries (code),
        longitude double precision,
        lattitude double precision
    )
`;
  console.log('creating public.newsletter_items table');
  const newsletterItems = await db`
    create table if not exists public.newsletter_items(
        id serial primary key,
        title varchar(255),
        created timestamp with time zone,
        modified timestamp with time zone
    )
`;

  console.log('creating public.newsletter_item_photos table');
  const newsletterItemPhotos = await db`
  create table if not exists public.newsletter_item_photos(
      id serial primary key,
      newsletter_item_id int references newsletter_items (id),
      name varchar(255),
      caption varchar(255),
      location_id int references locations (id),
      format varchar(255),
      size int
  )
`;

  console.log('creating public.newsletter_item_movie_tv_reviews table');
  const newsletterItemMovieTvReview = await db`
  create table if not exists public.newsletter_item_movie_tv_reviews(
      id serial primary key,
      newsletter_item_id int references newsletter_items (id),
      name varchar(255),
      rating int,
      notes varchar(255),
      link varchar(255),
      where_to_watch text[]
  )
`;

  console.log('creating public.newsletter_item_texts table');
  const newsletterItemTexts = await db`
  create table if not exists public.newsletter_item_texts(
      id serial primary key,
      newsletter_item_id int references newsletter_items (id),
      title varchar(255),
      description varchar(255),
      link varchar(255)
  )
`;

  console.log('creating public.newsletter_item_videos table');
  const newsletterItemVideos = await db`
    create table if not exists public.newsletter_item_videos(
      id serial primary key,
      newsletter_item_id int references newsletter_items (id),
      title varchar(255),
      caption varchar(255),
      location_id int references locations (id),
      format varchar(255),
      size int
  )
`;

  console.log('creating public.tags table');
  const tags = await db`
  create table if not exists public.tags(
      id serial primary key,
      name varchar(255)
  )
`;

  console.log('creating public.newsletter_item_tags table');
  const newsletterItemTags = await db`
  create table if not exists public.newsletter_item_tags(
      tag_id int references tags (id),
      newsletter_item_id int references newsletter_items (id)
  )
`;
}

export async function dropTables(db: postgres.Sql) {
  const schema = 'public';
  const tables = await db<{ tableName: string }[]>`
    select 
      table_name 
    from information_schema.tables 
    where table_type = ${'BASE TABLE'} AND table_schema = ${schema};
`;

  for (let i = 0; i < tables.length; i++) {
    const table = `${schema}.${tables[i].tableName}`;
    console.log(`deleting table: ${table}`);
    await db`drop table if exists ${db(table)} cascade`;
  }
}

export async function truncateTables(db: postgres.Sql) {
  const schema = 'public';
  const tables = await db<{ tableName: string }[]>`
    select 
      table_name 
    from information_schema.tables 
    where table_type = ${'BASE TABLE'} AND table_schema = ${schema};
`;

  for (let i = 0; i < tables.length; i++) {
    const table = `${schema}.${tables[i].tableName}`;
    console.log(`truncating table: ${table}`);
    await db`truncate table ${db(table)}`;
  }
}

export async function initialData(db: postgres.Sql) {
  const content = await parseCsvFile(
    `/Users/isaacparsons/documents/projects/athena/resources/countries.csv`
  );
  const countries: Country[] = [];
  for (let i = 0; i < content.length; i++) {
    const country = content[i];
    countries.push({
      code: country[0],
      lattitude: parseFloat(country[1]),
      longitude: parseFloat(country[2]),
      name: country[3],
    });
  }
  countries.forEach(async (country) => {
    await db`
      insert into public.countries 
          (code, name, longitude, lattitude)
        values
          (${country.code}, ${country.name}, ${country.lattitude}, ${country.longitude})
        on conflict do nothing
  `;
  });
  await db`
    insert into public.users 
        (first_name, last_name, email)
      values
        ('isaac', 'parsons', 'isaac.2962@gmail.com')
      on conflict do nothing
  `;
}
