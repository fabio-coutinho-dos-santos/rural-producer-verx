.PHONY: create-app
create-app:
	@npm i -D typescript express nodemon ts-node @types/express @types/node http-status-codes
	@npm i pg typeorm dotenv reflect-metadata
	@npm i express-async-errors
	@npm i swagger-ui-express @types/swagger-ui-express -D
	@npm install yamljs @types/yamljs
	@npm i -D jest typescript
	@npm i -D ts-jest @types/jest
	@npm i eslint -D
	@npm i supertest @types/supertest -D