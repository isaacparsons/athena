# docker-compose -f ./docker-compose.development.yaml up -d db api
docker-compose  -f ./docker-compose.development.yaml --env-file ./.env.local build && docker-compose  -f ./docker-compose.development.yaml --env-file ./.env.local up -d db api

# && npx tsx --tsconfig apps/newsletter/tsconfig.app.json apps/newsletter/src/scripts/create-tables.ts && npx tsx --tsconfig apps/newsletter/tsconfig.app.json apps/newsletter/src/scripts/seed.ts && docker-compose --env-file ./.env.local up api