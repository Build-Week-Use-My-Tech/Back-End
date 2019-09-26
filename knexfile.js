// Update with your config settings.

require("dotenv").config();
module.exports = {
  testing: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 8100,
      database: "myTechStuffTest",
      user: "postgres",
      password: process.env.DB_PASSWORD
    },
    useNullAsDefault: true,

    migrations: {
      directory: "./data/migrations"
    },

    seeds: {
      directory: "./data/seeds"
    }
  },

  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/useMyTechStuff.db3"
    },
    migrations: {
      directory: "./data/migrations"
    },

    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      }
    }
  },

  production: {
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    },

    seeds: {
      directory: "./data/seeds"
    }
  }
};
