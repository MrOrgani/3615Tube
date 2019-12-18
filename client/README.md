## If errors on Database
### like :
`ERROR CONNECTING TO DB QueryFailedError: column "id" contains null values
server_container |     at new QueryFailedError (/usr/app/src/error/QueryFailedError.ts:9:9) [...]`

docker -it exec postgres_container bash
docker exec -it postgres_container bash
---> psql -U postgres
---> DELETE FROM users;


## How the Front-End Works 
