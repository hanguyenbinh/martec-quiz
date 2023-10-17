#!/usr/bin/env bash

mysql -u root -proot testing-database < "/docker-entrypoint-initdb.d/000-create-databases.sql"