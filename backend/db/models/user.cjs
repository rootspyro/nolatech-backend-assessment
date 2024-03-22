const { DataTypes, Model, Sequelize } = require("sequelize")
const db = require("../conn.cjs")

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("now") 
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true 
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "AVAILABLE"
  },
}, {
  sequelize: db,
  modelName: "user",
  timestamps: false
})

User.sync({alter:true})
module.exports = User
