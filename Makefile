setup:
	docker-compose build --no-cache
	docker-compose run --rm graphql_api_app yarn install

migration-generate:
	docker-compose run --rm graphql_api_app sh -c "npm run db:migration:generate -name='$(name)'"

migration-run:
	docker-compose run --rm graphql_api_app sh -c "npm run db:migration:run"
