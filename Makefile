DOCKER_COMPOSE = docker compose -f ./src/docker-compose.yml

up:
	@${DOCKER_COMPOSE} up --build -d

down:
	@${DOCKER_COMPOSE} down

start:
	@${DOCKER_COMPOSE} start

stop:
	@${DOCKER_COMPOSE} stop

logs:
	@${DOCKER_COMPOSE} logs

prune:
	@docker system prune -af 2>/dev/null || true

.PHONY: up down stop start fclean

.NOTPARALLEL: up down stop start fclean