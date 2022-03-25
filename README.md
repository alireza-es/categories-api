# RESTful API Node Server for categories
## Task
Build simple RESTful API to return the category tree (recursively) with filter parameter function:

- api/categories -> return full category tree
- api/categories?id=1 -> return category tree with the root node as id = 1
  
``` js
Category1
-----Subcategories
--------Subcategories
-----Subcategories
Category2
----Subcategories2
Category3
----Subcategories3
----------Subcategories33
``` 
## Install
Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

### Running locally:

```bash
yarn start
```

### Running in production:

```bash
yarn prod
```

### Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

### Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```
### Running with docker:

```bash
docker-compose up
```