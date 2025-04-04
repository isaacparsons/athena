# newsletter

## Finish your CI setup

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve newsletter
```

To create a production bundle:

```sh
npx nx build newsletter
```

To see all available targets to run for a project, run:

```sh
npx nx show project newsletter
```

run dev

```sh
nx run newsletter:up
```

run prod

```sh
nx run newsletter:up:production
```

teardown

```sh
nx run newsletter:down
```

generate db types

```sh
nx run newsletter:generate:db
```

generate dump

```sh
docker exec -it <container> bash -c "pg_dump newsletter -U postgres -f /var/lib/postgresql/newsletter-dump.sql"

docker cp <container>:/var/lib/postgresql/newsletter-dump.sql /Users/isaacparsons/Desktop/newsletter-dump.sql
```
