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

# vielle doc --> plus pertinente mais je la garde au cas ou

docker run -p 5432:5432 -d \
 -e POSTGRES_PASSWORD=postgres \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_DB=stripe-example \
 -v pgdata:/var/lib/postgresql/data \
 postgres

psql stripe-example -h localhost -U postgres

docker exec -it bdca2b8c09b7 psql -U postgres stripe-exampl
