create new entity:
- create file: ./src/entites/<entity name>.entity.ts
- run this cmd for generating a migration: npm run migration:generate ./migrations/init
- run migration: npm run migration:run to apply changes to database

start a project normally:
- docker-compose up database redis
- npm run start:dev or npm start

start a project with docker fully
- docker-compose up --build -d

check the system run successful by acceess this url:
http://localhost:3000/swagger

NOTE:
- configuration files: config.yaml, docker-compose.yaml
- in docker environment, the env vars in docker-compose.yaml will be used first
- when change the configuration, please change in both file: config.yaml, docker-compose.yaml

