// import postgres from 'postgres';
// import { parseCsvFile } from '../util/parse-csv';

// export class DBSetup {
//   db: postgres.Sql;
//   constructor(db: postgres.Sql) {
//     this.db = db;
//   }
//   async setup() {
//     await this.createTables();
//     await this.initialData();
//   }

//   async teardown() {
//     this.dropTables();
//   }

//   async createTables() {
//     console.log('creating public.users table');
//     await this.db`
//       create table if not exists public.users(
//           id serial primary key,
//           first_name varchar(255),
//           last_name varchar(255),
//           email varchar(255) not null unique
//       )
//     `;
//     console.log('creating public.newsletters table');
//     await this.db`
//     create table if not exists public.newsletters(
//         id serial primary key,
//         name varchar(255) not null,
//         created timestamp with time zone not null,
//         modified timestamp with time zone not null,
//         owner_id integer references users (id) not null,
//         start_date date,
//         end_date date,
//         google_drive_folder_id varchar(255) not null
//     )
// `;
//     console.log('creating public.user_newsletters table');
//     await this.db`
//     create table if not exists public.user_newsletters(
//         user_id integer references users (id) not null,
//         newsletter_id integer references newsletters (id) not null
//     )
// `;
//     console.log('creating public.countries table');
//     await this.db`
//     create table if not exists public.countries(
//         code varchar(255) primary key,
//         name varchar(255) not null,
//         longitude double precision not null,
//         lattitude double precision not null
//     )
//   `;
//     console.log('creating public.locations table');
//     await this.db`
//     create table if not exists public.locations(
//         id serial primary key,
//         name varchar(255) not null,
//         country_code varchar(255) references countries (code),
//         longitude double precision,
//         lattitude double precision
//     )
// `;
//     console.log('creating public.newsletter_items table');
//     await this.db`
//     create table if not exists public.newsletter_items(
//         id serial primary key,
//         newsletter_id integer references newsletters (id),
//         title varchar(255) not null,
//         created timestamp with time zone not null,
//         modified timestamp with time zone not null
//     )
// `;

//     console.log('creating public.newsletter_item_photos table');
//     await this.db`
//   create table if not exists public.newsletter_item_photos(
//       id serial primary key,
//       newsletter_item_id int references newsletter_items (id) not null,
//       name varchar(255) not null,
//       google_drive_file_id varchar(255) not null,
//       link varchar(255) not null,
//       caption varchar(255),
//       location_id int references locations (id),
//       format varchar(255),
//       size int
//   )
// `;

//     console.log('creating public.newsletter_item_movie_tv_reviews table');
//     await this.db`
//   create table if not exists public.newsletter_item_movie_tv_reviews(
//       id serial primary key,
//       newsletter_item_id int references newsletter_items (id) not null,
//       name varchar(255) not null,
//       rating double precision not null,
//       notes varchar(255),
//       link varchar(255),
//       where_to_watch text[]
//   )
// `;

//     console.log('creating public.newsletter_item_texts table');
//     await this.db`
//   create table if not exists public.newsletter_item_texts(
//       id serial primary key,
//       newsletter_item_id int references newsletter_items (id) not null,
//       title varchar(255) not null,
//       description varchar(255),
//       link varchar(255)
//   )
// `;

//     console.log('creating public.newsletter_item_videos table');
//     await this.db`
//     create table if not exists public.newsletter_item_videos(
//       id serial primary key,
//       newsletter_item_id int references newsletter_items (id) not null,
//       title varchar(255) not null,
//       caption varchar(255),
//       location_id int references locations (id),
//       format varchar(255),
//       size int
//   )
// `;

//     console.log('creating public.tags table');
//     await this.db`
//   create table if not exists public.tags(
//       id serial primary key,
//       name varchar(255) not null
//   )
// `;

//     console.log('creating public.newsletter_item_tags table');
//     await this.db`
//   create table if not exists public.newsletter_item_tags(
//       tag_id int references tags (id) not null,
//       newsletter_item_id int references newsletter_items (id) not null
//   )
// `;

//     console.log('creating public.federated_credentials table');
//     await this.db`
//   create table if not exists public.federated_credentials(
//     id serial primary key,
//     provider varchar(255) not null,
//     subject_id varchar(255) not null,
//     user_id int references users (id) not null
//   )`;
//   }

//   async dropTables() {
//     const schema = 'public';
//     const tables = await this.db<{ tableName: string }[]>`
//       select
//         table_name
//       from information_schema.tables
//       where table_type = ${'BASE TABLE'} AND table_schema = ${schema};
//   `;

//     for (let i = 0; i < tables.length; i++) {
//       const table = `${schema}.${tables[i].tableName}`;
//       console.log(`deleting table: ${table}`);
//       await this.db`drop table if exists ${this.db(table)} cascade`;
//     }
//   }

//   async truncateTables() {
//     const schema = 'public';
//     const tables = await this.db<{ tableName: string }[]>`
//       select
//         table_name
//       from information_schema.tables
//       where table_type = ${'BASE TABLE'} AND table_schema = ${schema};
//   `;

//     for (let i = 0; i < tables.length; i++) {
//       const table = `${schema}.${tables[i].tableName}`;
//       console.log(`truncating table: ${table}`);
//       await this.db`truncate table ${this.db(table)}`;
//     }
//   }

//   async initialData() {
//     const content = await parseCsvFile(
//       `/Users/isaacparsons/documents/projects/athena/resources/countries.csv`
//     );
//     const countries: DBCountry[] = [];
//     for (let i = 0; i < content.length; i++) {
//       const country = content[i];
//       countries.push({
//         code: country[0],
//         lattitude: parseFloat(country[1]),
//         longitude: parseFloat(country[2]),
//         name: country[3],
//       });
//     }
//     countries.forEach(async (country) => {
//       await this.db`
//         insert into public.countries
//             (code, name, longitude, lattitude)
//           values
//             (${country.code}, ${country.name}, ${country.lattitude}, ${country.longitude})
//           on conflict do nothing
//     `;
//     });
//     await this.db`
//       insert into public.users
//           (first_name, last_name, email)
//         values
//           ('isaac', 'parsons', 'isaac.2962@gmail.com')
//         on conflict do nothing
//     `;
//   }
// }
