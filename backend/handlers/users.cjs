/*
 * Users Handlers Module
 */

const userModel = require("../db/models/user.cjs")
const Responses = require("../core/responses.cjs")
const { Op } = require("sequelize");
const bcrypt = require("bcrypt")

const responseModule = new Responses()

async function GetUsers(req, res) {

  try {

    const dataResponse = await userModel.findAll({
      where: {
        status: "AVAILABLE" 
      }
    }) 

    const data = dataResponse.filter((user) => user.dataValues) 

    const response = {
      itemsFound: data.length,
      items: data
    }

    responseModule.OK(res, response)

    return

  } catch(err) {

    console.log(err)
    responseModule.INTERNAL_SERVER_ERROR(res)
  }

}

async function GetSingleUser(req, res) {

  const params = req.params
  const id = params.id
  
  try {
    
    const dbResponse = await userModel.findByPk(id, {}) 

    if (dbResponse == null) { // NOT FOUND
      responseModule.NOT_FOUND(res)
      return
    }

    const data = dbResponse.dataValues
    responseModule.OK(res, data)

  } catch(err) {

    console.log(err)
    responseModule.INTERNAL_SERVER_ERROR(res)
  }
}

async function CreateUser(req, res) {

  const body = req.body

  // validates if user already exits
  const exitsUser = await userModel.findOne({
    where: {
      [Op.or]: [
        { username: body.username },
        { email: body.email }
      ]
    }
  })

  if ( exitsUser ) {

    responseModule.Base(res, 403, false, {
      data: "user already exits!"
    })
    return
  }

  // if user don't exits then create it

  bcrypt.hash(body.password, 10)
    .then(async hash => {

      const newUser = await userModel.create({
        username: body.username,
        email: body.email,
        firstname: body.firstname,
        lastname: body.lastname,
        password: hash 
      }, {
        fields: [
          "id",
          "username",
          "email",
          "firstname",
          "lastname",
          "password",
          "created_at",
          "updated_at",
          "status"
        ]
      })

      if (newUser == null) {

        responseModule.INTERNAL_SERVER_ERROR(res)
        return
      } 

      responseModule.CREATED(res, newUser.dataValues)
      return

    }).catch(err => {

      console.log(err)
      responseModule.INTERNAL_SERVER_ERROR(res)
      return
    })

}

async function UpdateUser(req, res) {

  responseModule.OK(res, {})
}

module.exports = {
  GetUsers,
  GetSingleUser,
  CreateUser,
  UpdateUser,
}
