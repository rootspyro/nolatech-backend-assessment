const { Sequelize } = require('sequelize');

const dbconn = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres"
})

try {
  dbconn.authenticate();
  console.log('Connection has been established successfully.');
} catch(err) {
  console.error('Unable to connect to the database:', err);
}

module.exports = dbconn
