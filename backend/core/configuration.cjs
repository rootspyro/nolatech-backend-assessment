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
  },
  Database : {
    dialect: "postgres",
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
}

console.log(process.env.PORT)
console.log(process.env.DB_NAME)
console.log(process.env.DB_HOST)
console.log(process.env.DB_USERNAME)
console.log(process.env.SECRET)
