/*
 * Users Handlers Module
 */

const userModel = require("../db/models/user.cjs")
const Responses = require("../core/responses.cjs")

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


function createUserPipe(body, res) {

  const {
    username
  } = body

  if ( !username ) {

    responseModule.BODY_NOT_FOUND_FIELD(res, "username")    
    console.log("error")

  } else  if ( username.length <= 3 ) {
    
    responseModule.BODY_FIELD_LENGTH_ERROR(res, "username", 3)
  }
}

async function CreateUser(req, res) {

  responseModule.CREATED(res, {})

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
