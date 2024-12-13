APP_NAME = hontokun-front

COMPOSE = docker/


ps:
		docker compose -f ${COMPOSE}docker-compose.yaml ps

images:
		docker images

network:
		docker network create -d bridge hontokun

# build & push

build:
		docker compose -f ${COMPOSE}docker-compose.yaml -f ${COMPOSE}docker-compose.dev.yaml build --no-cache

prod-build:
		docker compose -f ${COMPOSE}docker-compose.yaml -f ${COMPOSE}docker-compose.prod.yaml build --push

# up & down

up:
		docker compose -f ${COMPOSE}docker-compose.yaml -f ${COMPOSE}docker-compose.dev.yaml up -d

down:
		docker compose -f ${COMPOSE}docker-compose.yaml -f ${COMPOSE}docker-compose.dev.yaml down

#exec

app-shell:
		docker exec -it $(APP_NAME) /bin/sh