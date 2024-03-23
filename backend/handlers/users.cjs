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

module.exports = {
  GetUsers,
  GetSingleUser
}
