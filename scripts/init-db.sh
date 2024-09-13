#!/bin/bash

CONTAINER_NAME="local_db_1"

docker exec $CONTAINER_NAME bash -c "psql -d newsletter -U postgres -c \
\"CREATE TABLE if not exists public.newsletters (\
id serial, \
name varchar(255), \
created timestamp with time zone, \
modified timestamp with time zone);\""


docker exec $CONTAINER_NAME bash -c "psql -d newsletter -U postgres -c \
\"CREATE TABLE if not exists public.newsletters (\
id serial, \
name varchar(255), \
country varchar(255), \
lattitude double precision, \
longitude double precision);\""