echo "NODE_ENV=production
DATABASE_URL=postgres://postgres:postgres@0.0.0.0:5432/newsletter
DB_HOST=db
DB_PORT=5432
DB_NAME=newsletter
DB_USERNAME=postgres
DB_PASSWORD=postgres
APP_SESSION_SECRET=
APP_SESSION_COOKIE_NAME=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
GOOGLE_STORAGE_BUCKET_NAME=
ADMIN_SECRET=
CLIENT_HOST=0.0.0.0
CLIENT_PORT=4200
APP_HOST=0.0.0.0
APP_PORT=3000" > ./.env

docker-compose --env-file ./.env build && docker-compose --env-file ./.env up -d db api