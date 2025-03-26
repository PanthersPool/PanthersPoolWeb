# PanthersPoolWeb

## Setup Backend:
In the "panthers-pool" directory, install knex, sqlite3, cors, and express.js:

```
💻 npm install express knex sqlite3 cors
```
Alternatively, if that doesn't install all four packages:
Install knex in the "PanthersPoolWeb" directory:

```
💻 npm install knex
```

Then install sqlite3 in both the "PanthersPoolWeb" directory and the "panthers-pool" directory:
```
💻 npm install sqlite3
```

Then run migrations in the "PanthersPoolWeb" directory:

```
💻 npx knex migration:latest
💻 npx knex seed:run
```

If making changes to schema, models, or data, you need to rollback before re-migrating.
Changes will not be applied otherwise.
```
💻 npx knex migration:rollback
```

Start server.js in "panthers-pool" directory:
```
💻 node server.js
```

The server is configured to run at localhost:3000 (see server.js file and vite.config.js file for more information). server.js will have to be restarted if any new API routes are made or edited.

