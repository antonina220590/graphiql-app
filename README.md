# REST/GraphiQL Client

## Project description

This REST/GraphiQL Client project aims to develop a light-weight versions of Postman and GrqphiQL combined in one app.
Key pages of the application include:

- Login and Registration pages 🖥️
- Main page 🏠
- REST Client page 📋
- GraphiQL Client page 🔎

The project is being developed as the final task of the RS school's JS / React course. Its main goals are:

- consolidation of the knowledges gained during this course and,
- improvement of teamwork skills.

Our team:

- [antonina220590](https://github.com/antonina220590)
- [inaFK](https://github.com/inafk)
- [KrKate](https://github.com/krkate)

Our mentor:

- [andron13](https://github.com/andron13)

### Technology stack

#### Front-end:

- HTML
- TailwindCss
- TypeScript
- Webpack
- React
- Next JS
- Vitest

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build the application:

```bash
npm run build
```

Compiles the application for production deployment. It optimizes the app for the best performance.

### Start the application in production mode

```bash
npm run start
```

Starts the server in production mode. Must be used after building the app.

### Lint the project files

```bash
npm run lint
```

Runs ESLint to find and fix problems in your JavaScript and TypeScript files within the app/ directory.

### Format the project files

```bash
npm run prettier:fix
```

Runs Prettier to format code.

### Run Tests

```bash
npm run test
```

Executes the test suites of the application using Vitest.

### Run Tests Coverage

```bash
npm run test:coverage
```

Executes the test coverage.

## GraphiQL Requests Examples

### Post

#### Without variables

##### Example 1

```
##### endpoint url:
https://graphqlzero.almansi.me/api

##### query:

 query {
  albums {
    data {
      title
    }
  }
}

##### headers (optional)

Content-Type: application/json

```

##### Example 2

```
##### endpoint url:
https://graphql-pokeapi.graphcdn.app/

##### query:

query {
  pokemons {
    results {
      name
    }
  }
}

##### headers (optional)

Content-Type: application/json

```

#### With variables

##### Example 1

```

##### endpoint url:

https://graphqlzero.almansi.me/api

##### query:

query ($id: ID!) {
  album(id: $id) {
    title
    user {
      name
      username
    }
  }
}

##### Variables

{
"id": 3
}

##### headers (optional)

Content-Type: application/json

```

##### Example 2

```

##### endpoint url:

https://swapi-graphql.eskerda.vercel.app/

##### query:

query ($id: ID, $planetID: ID) {
  planet(id: $id, planetID: $planetID) {
    name
  }
}

##### Variables

{
"id": 1,
"planetID": 1
}

##### headers (optional)

Content-Type: application/json

```

### Mutation

```
##### endpoint url:

https://apollo-fullstack-tutorial.herokuapp.com/graphql

##### query:

mutation Login($email: String!) {
  login(email: $email) {
    token
  }
}

##### variables:

{
  "email": "test@test.com"
}

```
