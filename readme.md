# API-RESTful

Api RESTful desenvolvida para o cadastro de produtores rurais e suas fazendas como teste técnico para desenvolvedor back end na VERX.

## Principais elementos utilizados no desenvolvimento

- node v18.10.0
- express
- typescript
- postgres
- typeORM
- jest
- supertest
- eslint
- swagger
- docker
- docker compose

## Principais design patterns adotados

- Clean Code
- Single Responsability Principle (SRP)
- Don't repeat yourself (DRY)
- Keep it simple, stupid (KISS),
- You aren't gonna need it (YAGNY)
- Repository
- Dependency Injection
- Dependency Inversion
- Interface Segregation
- Factory
- Builder
- TDD

## Arquitetura

Toda a construção da api assim como a hierarquia de pastas foram definidos aplicando práticas de modelagem do Domain Driven Design (DDD) em conjunto com Clean Architecture. Dessa forma, a arquitetura proteje as regras de negócio com as entidades referentes ao dominio principal da aplicação no nucleo, matendo as partes agregadas ao negócio nas extremidades da arquitetura, como sugerem as arquiteturas limpa e hexagonal.

Como parte das práticas do DDD, destaca-se a criação das entidades de domínio contendo suas respectivas validações oriundas das regras de negócio, assim como a construção de value objects quando se fez necessário. Além disso, toda a estrutura da hierarquia de pastas adotada e manutenção da linguagem ubiqua.

Por outro lado, destaca-se como práticas referentes a arquitetura limpa a criação de camadas anticorrupção entre os elementos de dominio e as partes agregadas da aplicação, possibilitando tanto a injeçao de dependências quanto a inversão dessas dependencias tornando o código mais desacoplado.

## Descrição

A Api elaborada possui duas entidades de domínio, Producer e Farm.
Como convensão para escopo do desenvolvimento do teste foi definido que um Producer pode ter várias Farms, contudo uma Farm pode pertencer apenas a um Producer.

Para realizar as tarefas de CRUD destas entidades e suas respectivas regras de negócio elas foram modeladas para o Banco de dados postgres da seguinte forma:

- Tabelas:
- **producers**, contendo as colunas:
  - id
  - name
  - document
  - createAt
  - updatedAt

- **farms**, conten os colunas:
  - id
  - name
  - city
  - state
  - producerId
  - arableArea
  - vegetationArea
  - totalArea
  - crops [ "soy", "corn", "cotton", "coffe", "suggarCane" ]
  - createAt
  - updatedAt

**OBS**: Como o banco postgres permite a gravação de arrays, essa foi a estratégia adotada para determinar os tipos de plantações que as fazendas possuem.

O nível de maturidade adotado para elaboração da API foi o 2, já tornando-a RESTful e combinando o verbos HTTP com seus respectivos significados semânticos, assim como utilizando de forma expressiva os recursos a ações a serem executadas nas rotas da aplicação.

Todo o desenvolvimento foi guiado por testes. Assim, foram elaborados testes automatizados de unidade para todas as funcionalidades providas pela aplicação, incluindo as regras de negócio. Além disso, também foram desenvolvidos testes de integração para todas as rotas da aplicação, para o qual foi utilizado ou outro banco de dados exclusivo para testes. 


## Detalhes de implementação
 - Altíssima cobertura de testes. Para verificar basta executar o comando **npm run test:cov** após configurar o projeto localmente.
 - Paginação nas rotas que retornam todos os recursos
 - Utilizalção de git flow e conventional commits.
 - Utilização de logs estruturados para facilitar o scrap de ferramentas de observabilidade
 - Devido ao escopo ser uma aplicação de teste não foram adotadas:
  - Instrumentação de métricas, traces e logs para observabilidade
  - Criaçao/Alteração das tabelas por meio de migrations. (***Foi utilizado o atributo syncronize do TypeORM com true, o que não deve ser feito em produção***)

## Ci-Cd

- Como prática de Devops abrangendo construções e entregas contínuas, para escopo deste teste foi criado um pipeline de ci com github actions que realiza o build do projeto, executa a ferramenta de lint para conferência de errors estáticos do código e também executa os testes unitário e de integração em passos separados. 

- Por outro lado, como entrega contínua, a aplicação é implantada no provedor Render que é vinculado ao repositório do projeto e, quando ocorre uma atualização no branch main é construída uma nova versão a partir da imagem docker, descrita no Dockerfile e, essa nova versão já fica disponível em produção. 

- Para proteção do deploy utilizando essa estratégia basta configurar o repositório no github para não aceitar push diretamente no branch main, sendo que isso śo poderá ocorrer via aprovação de PR e, também configurar que a PR só porderá ser aprovada após a execuçaõ do pipeline. Por questões de agilidade, e por se tratar de uma aplicação com escopo de teste, não foram aplicadas essas configurações

- Outra estratégia, que não foi adotada devido a envolver custos e escopo, é a integração do pipeline de ci com o sonarqube onde podem ser inferidas regras para barrar códigos mal escritos e com baixa porcentagem de cobertura de testes.

- Para execução da aplicação são necessários 2 bancos de dados, um para os dados da aplicação e o outro para a execução dos testes de integração. Ambos os bancos de dados também foram criados em seviços do provedor Render, tornando possível a aplicação do pipeline e também da utilização das rotas da api em produção.

- Foi elaborado também um arquivo de deployment.yaml para que e aplicação seja implantada em um cluster kubernetes apenas configurando as variáveis de ambiente corretamente.

- **OBS**: A escolha de hospedagem da aplicação e dos bancos de dados no provedor Render foi devido a ter a disponibilidade destes recursos de forma gŕatis com algumas limitações, mas sendo suficiente para testar a aplicação em um ambiente de produção e serverless. Outras estratégias poderiam ser utilizadas aqui, como construção das pipelines de Ci diretamente nos cloud providers via Code Pipeline (AWS) ou Cloud Build (GCP), combinando estratégias de contrução da imagem docker e gravação desta no artifact registry (GCP) ou ECR (AWS) e posterior implantação como serverless no Cloud Run(GCP) ou Fargate(AWS). Estas estratégias assim como outras possíveis não foram adotadas pois envolvem custos.

## Documentação

 - Foi elaborado a documentação da api em formato OpenApi que está contido em docs/api.yaml. Neste arquivo estão descritas todas as rotas da aplicação.

 - Para visualizar essa documentação assim como executar as requisições, foi utilizado o swagger podendo ser configurado para executar as requisições tanto no ambiente local, quanto em produção.

 - A documentação swagger está disponível em: [https://test-verx-api.onrender.com/api/v1/doc/](https://test-verx-api.onrender.com/api/v1/doc/)

## Melhorias arquiteturais

 - Pensando que poderia haver a necessidade de escalar esta aplicação algumas melhorias arquiteturais poderiam ser adotadas visando aspectos como escalabilidade, elasticidade, disponibilidade e agilidade, são elas:

- Deploy automatizado, a partir de uma pipeline no AWS Code Pipeline, em máquinas EC2 com nginx como proxy reverso para roteamento. Em seguida criação de Load Balancer e Auto Scale Group para permitir que a aplicação escale conforme a carga de requisições. Outra estratégia neste contexto que poderia ser adotada é o deploy em um cluster kubernetes configurando uma HPA adequada para realização de escala horizontal dos pods e adequação da aplicação à carga recebida.

- Outra melhoria que poderia ser aplicada visando o desempenho e disponibilidade da aplicação seria a implementação de CQRS em conjunto com um streaming de eventos. Assim, sempre que fosse criado ou modificado um registro no sistema, poderia ser disparado um evento, via Kafka, SNS, SQS, RabbitMq, PubSub, etc. Esse evento seria capturado por uma funcção serverless, como uma lambda function por exemplo e, essa função manipularia os dados e gravaria os registros em outro formato mais adequado para visualização das informações, podendo utilizar outros bancos de dados para tal, como MongoDb ou DynamoDb. Após isso, réplicas de leituras desse novo banco de dados poderiam ser criados em diversas regiões da AWS por exemplo, diminuindo a latência das aplicações. Dessa forma, a implantação de CQRS facilitaria gravar/alterar dados em um formato e consumir esses dados em outro formato/banco de dados. Essa estratégia também pode ser executada em conjunto com bancos de cache como Redis e AWS Elasticache.

- Como estratégias de autenticação e autorização poderiam ser utilizadas soluções gerenciadas como o Cognito(AWS) ou o Keycloak para serem os servidores de identidade da aplicação.

## Execução local

### Utilizando docker compose
- Para executar o código localmente utilizando docker compose basta clonar o repositório e seguir os seguintes passos:
  - Criar um arquivo .env na raiz do projeto.
  - Configurar as seguintes variáveis de ambiente neste arquivo .env:
   - POSTGRES_URL_CONNECTION=postgres://local:password@svc-farm-db:5432/dbFarms
   - POSTGRES_TEST_URL_CONNECTION=postgres://local:password@svc-farm-db-test:5432/dbFarms
   - API_VERSION=v1
   - PORT=3000
  - Criar a rede interna do docker para conectar os containers executando o comando: **docker network create net-verx**
  - Na raiz do projeto, executar o comando **docker-compose up**

- Seguindo esses passos os container dos bancos de dados e da aplicação serão criados e a aplicação será iniciada automáticamente.

### Utilizando node instalado
 Para executar o código localmente basta clonar o repositório e seguir os seguintes passos:
  - Criar um arquivo .env na raiz do projeto.
  - Configurar as seguintes variáveis de ambiente neste arquivo .env:
   - POSTGRES_URL_CONNECTION=production-database-url
   - POSTGRES_TEST_URL_CONNECTION=production-database-test-url
   - API_VERSION=v1
   - PORT=3000
  - Na raiz do projeto, executar os comandos:
   - **npm install**
   - **npm run dev**
  
 ***OBS*** Caso tenha o postgres também instalado localmente basta criar dois bancos distintos e configurar as variávei de ambiente no seguinte padrão:
  - postgres://user:password@host:5432/dbName

## Deploy no kubernetes

- Foi elaborado um arquivo de deployment e um de secret para realizar o deploy da aplicação em um cluster kubernetes.
- Para isso devem ser seguidos os seguintes passos: considerando um ambiente local com kubectl e minikube instalados:
  - Realizar o build da imagem docker, executando o comando: **docker build -t verx-app-image .** . Estando na raiz do projeto
  - Copiar a imagem gerada para o repositório interno de imagens do minikube, executando o comando: **minikube image load verx-app-image:latest**
  - Atualizar o arquivo secrets.yaml com as strings de conexão com os bancos de produção convertido para base64
  - na raiz do projeto executar o comando **kubectl apply -f cd/k8s/secrets.yaml**
  - na raiz do projeto executar o comando **kubectl apply -f cd/k8s/deployment.yaml**

