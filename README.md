# EXPRESS REST API STARTER KIT

A Simple REST API app based on Express and PostgreSQL

## Features

- JWT Authentication
- Structured Folder for better architecture
- Using Objection.js

## Installation

### Clone it

Open your working folder and run command below on terminal

```bash
git clone https://github.com/kwaiks/express-api-js-starter-kit.git
```

### Install Dependencies

Move to your cloned directory

```bash
cd express-api-js-starter-kit
```

Install packages using npm

```bash
npm install
```

or yarn

```bash
yarn install
```

### Modify .env File

Edit .env.example file then rename it to .env
Below are the configurations

```dotenv
NODE_ENV = development
PORT = 3000
DB_NAME = YOURDBNAME
DB_USER = YOURDBUSER
DB_PASS = YOURDBPASS
```

## Start Application

### Run it

```bash
npm run start
```

## Miscellaneous

### Working with example data

Create new Database named express

```bash
sudo -u postgres psql
postgres=# create database express;
```

### Install Knex CLI

To be able using example data, install knex globally

```bash
npm install knex -g
```

### Create new migration file

Run command

```bash
npm run migration MIGRATION_NAME
```

Then open newly created file on ```src/db/migrations```

If you're done, you can run

```bash
npm run migrate:latest
```

### Create new Seed file

Run command

```bash
npm run seed SEED_NAME
```

Then open newly created file on ```src/db/seeds```

If you're done, you can run

```bash
npm run seed:run
```

### Edit DB Configuration

You could modify DB Configuration that can be found in ```src/config/knexConfig.js```

Below are the configurations

```javascript
client: "pg",
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: __dirname + "/db/migrations",
        tableName: "express_js_migrations"
    },
    seeds: {
        directory: __dirname + "/db/seeds"
    },
    ...knexSnakeCaseMappers()
```

### Postman Collection

You could import ```postman.json``` for postman collection to test this app with example data
