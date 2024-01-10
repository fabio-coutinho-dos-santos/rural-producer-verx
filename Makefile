.PHONY: create-app
create-app:
	@npm i -D typescript express nodemon ts-node @types/express @types/node
	@npm i pg typeorm dotenv reflect-metadata
	@npm i express-async-errors
	@npm i swagger-ui-express @types/swagger-ui-express -D
	@npm i -D jest typescript
	@npm i -D ts-jest @types/jest
	@npm i eslint -D
	@npm i supertest @types/supertest -D

# @npm i sqlite3  -E
# - create scripts inside package json:
#- "scripts": {
#     "dev": "nodemon --exec ts-node ./src/index.ts"
#     "test": "jest",
#     "dev": "nodemon --exec ts-node ./src/index.ts",
#     "migration:generate": "typeorm-ts-node-commonjs -d ./src/data-source.ts migration:generate ./src/migrations/default",
#     "migration:run": "typeorm-ts-node-commonjs -d ./src/data-source.ts migration:run"
#   },
#  - create tsconfig.json file
#  - create data-source file to configure typeORM => see beekeeper (tool to manage postgres database}
#  - create jest.config.ts
