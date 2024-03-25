const { Sequelize } = require('sequelize');
const appConf = require("../core/configuration.cjs")

const dbconn = new Sequelize(appConf.Database.name, appConf.Database.username, appConf.Database.password, {
  host: appConf.Database.host,
  dialect: appConf.Database.dialect,
  logging: false 
})


try {

  dbconn.authenticate();
  console.log('Connection has been established successfully.');

} catch(err) {
  console.error('Unable to connect to the database:', err);
}

module.exports = dbconn
