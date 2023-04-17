docker network create --driver bridge postgres-network
docker run --name postgres_lab -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5442:5432 --network=postgres-network -v /home/felipe/Documentos/Dev-pessoal/postgres_lab:/var/lib/postgresql/data -d postgres
docker run --name pgadmin_lab --network=postgres-network -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=felipe@gmail.com" -e "PGADMIN_DEFAULT_PASSWORD=root" -d dpage/pgadmin4
docker run -it -v /home/felipe/Documentos/Dev-pessoal/mongodb_lab:/data/db --name mongo_lab -p 27017:27017 -d mongo:5.0