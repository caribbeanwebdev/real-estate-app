# 😎 Read me

Node.js + Typescrypt + MongoDB Real Estate API as a proof of concept.

### 🎯 Prerequisites

- Docker v19.03.0+

### 🚀 Installation

> This application runs on a docker compose with his own mongodb database

Just run at the root of the project:

`docker-compose up -d`

The API will run on http://localhost:3021/api

Swagger UI will be on http://localhost:3021/api/swagger

Plus, you can go to 'homelike-service' folder and create a `.env` based on `.env.example` to run  the project locally with `npm run dev`

### 🔍 Running Tests

Run at the root of the project:

`npm run --prefix .\homelike-service\ test`
