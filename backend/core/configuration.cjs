module.exports = {
  App: {
    port: process.env.PORT   
  },
  Api: {
    Router: {
      version: "v1"
    },
    Authentication: {
      secret: process.env.SECRET,
      tokenExp: "12h"
    },
    Cors: {
      origin: "*",
    }
  },
  Database : {
    dialect: "postgres",
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
}
