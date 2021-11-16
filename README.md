[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/get-started/overview/)
[![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

# 😎 Read me

Real Estate Rest API in Node.js + Typescrypt + Express.js + MongoDB as a proof of concept.

### 🌟 Extra features

- **[GraphQL](https://graphql.org/)** - A fun query language for APIs.
- **[Docker](https://docs.docker.com/get-started/overview/)** - To easily run the project with just one command.
- **[Jest](https://jestjs.io/)** - To keep the project bug-free.
- **[Swagger](https://swagger.io/)** - To easily test the API with an awesome UI.

### 🎯 Prerequisites

- Docker v19.03.0+
- Node.js v14+
- NPM v6.X+

### 🚀 Installation

> This application runs on a docker compose with his own MongoDB database

Just make sure docker is running (if you don't have it installed, take a look on the official documentation https://docs.docker.com/get-docker/).<br/>
Run this command at the root of the project:

Linux/Mac/Windows
```shell
docker-compose up -d
```

The API will run on http://localhost:3021/api/

> The database is automatically seeded with test data

So you are ready to test it with an example request of apartments 20KM nearest to the center of Madrid.

Example request:<br/>
GET http://localhost:3021/api/apartments/?country=Spain&nearest=20&latitude=40.41829&longitude=-3.70358

### 📖 Exploring the API

When the application is running, you can explore and test the API with Swagger UI.<br/>

You can try it at http://localhost:3021/api/swagger

### 🤔 Why not GraphQL?

If you find that working with Rest is boring, this application has a GraphQL endpoint ready to work with the apartments data.<br/>

You can try it at http://localhost:3021/api/graphql

Example query:
```graphql
query {
  apartmentMany {
    name
    description
    price
    address
    city
    country
    rooms
  }
}
```

### 🔍 Running Tests

You can run Jest tests to make sure everything it's working fine, just run at the root of the project:

Linux/Mac/Windows
```shell
cd ./real-estate-service
npm install
npm run test
```

### 👨‍💻 Developing locally

If you want to run it without Docker, you first need a MongoDB instance running.

Create a `.env` file in 'real-estate-service' folder based on the `env.example` with this command:<br/>

Linux/Mac
```shell
cd real-estate-service
cp .env.example  .env
```

Windows
```shell
cd real-estate-service
xcopy /I .env.example  .env*
```

Set up the `.env` file with your MongoDB credentials and custom ports.<br/>

Finally run:

Linux/Mac/Windows
```shell
npm install
npm run dev
```
