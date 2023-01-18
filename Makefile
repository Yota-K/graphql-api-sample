setup:
	docker-compose build --no-cache
	docker-compose run --rm graphql_api_app yarn install

# yarnだとpackage.jsonで引数が渡せなかったのであえて、npmを使用
migration-generate:
	docker-compose run --rm graphql_api_app sh -c "npm run db:migration:generate -name='$(name)'"

migration-run:
	docker-compose run --rm graphql_api_app sh -c "npm run db:migration:run"

migration-revert:
	docker-compose run --rm graphql_api_app sh -c "npm run db:migration:revert"
