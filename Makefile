setup:
	docker-compose build --no-cache
	docker-compose run --rm graphql_api_app yarn install
	docker-compose up -d

# yarnだとpackage.jsonで引数が渡せなかったのであえて、npmを使用
migration-generate:
	docker-compose run --rm graphql_api_app sh -c "npm run db:migration:generate -name='$(name)'"

migration-run:
	docker-compose run --rm graphql_api_app sh -c "npm run db:migration:run"

migration-revert:
	docker-compose run --rm graphql_api_app sh -c "npm run db:migration:revert"

seeding:
	docker cp ${sqlDir} graphql_api_db:/tmp/seed.sql
	docker exec -it graphql_api_db /bin/bash -c 'mysql -u root -p ${name} < /tmp/seed.sql'
