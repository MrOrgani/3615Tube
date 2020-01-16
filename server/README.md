# base installation process

https://www.youtube.com/watch?v=3P8cDjHsOCA&list=PLN3n1USn4xlky9uj6wOhfsPez7KZOqm2V&index=3&t=31s

typeorm quick start
npm-check-update

# install on school computers

sh scripts/free_space.sh
sh scripts/docker_init.sh
brew install docker-compose
yarn install
cd server
yarn install
docker-compose build
docker-compose up

# connect to the database

docker exec -it postgres_container bash --> attaches your terminal to the running container named postgres_container
psql -U postgres --> open CLI for postgres with the rigt username
\c postgres --> connect to the database
You can now start the database

# start the tests

docker exec -it server_container bash
yarn test

# How the server works

src `(1)`
├── index.ts `(2)`
├── common -> ../../common/
├── pgdata
├── session
├── entity
│ ├── User.ts
├── modules `(3)`
│ ├── SubModules
│ │ ├── formatErrors
│ │ ├── rmUsers
│ │ └── sendMails
│ ├── middlware
│ │ ├── verifyAndSetSession
│ ├── Users
│ │ ├── login
│ │ ├── register
│ │ └── etc ...
├── scripts
│ ├── createTypes
├── types
│ ├── graphqlUtils
│ ├── schema.d.ts
│ ├── loginTest.ts
├── tests
│ ├── testToRunSequentially
│ ├── registerTest.ts
│ ├── loginTest.ts
├── utils
│ ├── connectToDb
│ ├── genSchema
│ ├── createSession
│ ├── etc...

When Server is launched (1) is called :
it checks the database columns are in check with entities declared (TypeOrm) and if not modifies the database directly

index.ts (2) is called :
it creates the graphql (graphqlYoga) server by aggregating all the schemas and the typedefs in modules. This aggregation is done by the src/utils/genSchema file
it then listens to BACK_HOST (127.0.0.1:4000) for all schemas defined previously in modules. All interactions with databse like
insertino update or other is handled by the typeorm defined entity (ex User.update({id}, {verified:true}))

modules (3) :
modules are the equivalent of routes --> the login moduled is called when someone makes a graphql request to the BACK_HOST. Each module can call other functions (in submodules) for instance for session creation

# vielle doc --> plus pertinente mais je la garde au cas ou

docker run -p 5432:5432 -d \
 -e POSTGRES_PASSWORD=postgres \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_DB=stripe-example \
 -v pgdata:/var/lib/postgresql/data \
 postgres

psql stripe-example -h 127.0.0.1 -U postgres

docker exec -it bdca2b8c09b7 psql -U postgres stripe-exampl
