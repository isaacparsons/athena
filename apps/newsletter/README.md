## dev setup

1. setup db

```sh
scripts/setup-local.sh
```

2. login to google

```sh
gcloud auth login
```

3. run server

```sh
nx run newsletter:serve:development
```

3. run frontend

```sh
nx run athena-frontend:serve:development
```
