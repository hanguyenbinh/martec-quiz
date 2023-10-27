Step to deploy the project:
- setup the social account: please read Guide to prepare for the demo
- copy the igUserId (from step 1), then place it in the config.yaml file
- Go to martec source dir, input the command line: docker-compose up --build
- Go to martec-frontend source dir, input the command line: docker-compose up --build
- By default, the backend url is: https://localhost:3000, the front end url is: https://localhost:5000
- API document url: https://localhost:3000/swagger

checking the publis image function:
- goto https://localhost:5000
- click to "Login with Facebook" button
- app should be redirect to dashboard page
- input image url to the image url text box: ex: https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/391654215_851853893105819_8743473212826596379_n.jpg?stp=dst-jpg_p720x720&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xzjJ5Rh5yC8AX_KI8IG&_nc_ht=scontent.fsgn13-4.fna&cb_e2o_trans=q&oh=00_AfDE8HIZq9UjmPwNICaaDnfKPzZs7vLgf_98gnhuKHtO5A&oe=653E5388
- click Go button, then go to the instagram page to check the result.
- by default, it should be here: https://www.instagram.com/daigiacuibap82/

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
https://localhost:3000/swagger

NOTE:
- configuration files: config.yaml, docker-compose.yaml
- in docker environment, the env vars in docker-compose.yaml will be used first
- when change the configuration, please change in both file: config.yaml, docker-compose.yaml

