# EnquireAI Case Study

## Prerequisites

 - [Docker Engine](https://docs.docker.com/engine/install/)
 - [Docker Compose v2](https://docs.docker.com/compose/install/)

## Build steps

Thanks to the Docker Engine and Docker Compose, the build steps are so simple. Run the command:

```bash
docker compose pull
docker compose build
```

If the machine can't handle the concurrent image building, the images can be built one by one:

```bash
docker compose build ingester
docker compose build api
docker compose build ui
```

## Run steps

Running the app is also easy. Just run the command:

```bash
docker compose up -d
```

This command will wait for the database to be ready, then will run other images. After all of the images started, go to the link http://localhost/ 

## Stopping containers

Run this command to stop the containers:

```bash
docker compose down
```

## Schema

Schema is built with the commands located in the [schema.sql](ingester/schema.sql) file.
