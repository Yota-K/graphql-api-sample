setup:
	docker-compose build --no-cache
	docker-compose run --rm graphql_api_app yarn install
