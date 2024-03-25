/*
 * Users Handlers Module
 */

const userModel = require("../../db/models/user.cjs")
const Responses = require("../../core/responses.cjs")
const pipes = require("./pipes.cjs")
const { Op, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt")

const responseModule = new Responses()

async function GetUsers(req, res) {

  try {

    const {
      page,
      count
    } = pipes.GetUsersQueries(req.query)

    let offset = ((page - 1) * count)

    const dataResponse = await userModel.findAll({
      offset: offset,
      limit: count,
      order: [
        ["id", "DESC"]
      ]
    }) 

    const data = dataResponse.filter((user) => user.dataValues) 

    const users = data.map(user => {
      return pipes.User(user)
    })

    const response = {
      itemsFound: users.length,
      items: users 
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
    responseModule.OK(res, pipes.User(data))

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

    responseModule.Base(res, 403, false, "User already exits")
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

      responseModule.CREATED(res, pipes.User(newUser.dataValues))
      return

    }).catch(err => {

      console.log(err)
      responseModule.INTERNAL_SERVER_ERROR(res)
      return
    })

}

async function UpdateUser(req, res) {

  const params = req.params
  const id = params.id


  try {

    // validate if users exists 
    let user = await userModel.findByPk(id, {})

    if (user == null) {
      responseModule.NOT_FOUND(res)
      return
    }

  } catch(err) {
    responseModule.INTERNAL_SERVER_ERROR(res)
  }

  let body = pipes.UpdateUserBodyPipe(req.body) 
  body.updated_at = Sequelize.fn("now")

  try {

    const updateResponse = await userModel.update(body, {
      where: {
        id
      },
      returning: true
    })

    const userUpdated = updateResponse[1][0]

    responseModule.OK(res, pipes.User(userUpdated.dataValues))    

  } catch(err) {
    console.log(err)
    responseModule.INTERNAL_SERVER_ERROR(res)
  }
}

async function DeleteUser(req, res) {  

  const params = req.params
  const id = params.id

  try {

    // validate if user exist
    const user = await userModel.findByPk(id)

    if (user == undefined) {
      responseModule.NOT_FOUND(res)
      return
    }

    const deleteUser = await userModel.destroy({
      where: {
        id
      }
    })

    responseModule.OK(res,{
      affectedRows: deleteUser,
      message: "user successfully deleted"
    })

    return

  } catch(error) {
    console.log(error)
    responseModule.INTERNAL_SERVER_ERROR(res)
    return
  }

}

module.exports = {
  GetUsers,
  GetSingleUser,
  CreateUser,
  UpdateUser,
  DeleteUser
}
