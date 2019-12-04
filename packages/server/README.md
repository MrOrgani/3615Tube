# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

# base installation process

https://www.youtube.com/watch?v=3P8cDjHsOCA&list=PLN3n1USn4xlky9uj6wOhfsPez7KZOqm2V&index=3&t=31s

# Basic resume

typeorm quick start
npm-check-update
tsconfig from ben awad
create database graphql-ts-server

# Install postgre on school computers

brew install postgresql
initdb ~/data/postgres
postgres -D ~/data/postgres
createdb graphql-ts-server
to connect to cli run psql graphql-ts-server
--> CREATE DATABASE htdb --> CREATE ROLE postgresUser VALID UNTIL 'infinity'
--> ALTER DATABASE htdb OWNER TO postgresuser --> ALTER ROLE postgreuser WITH LOGIN
--> \c to connect to database
