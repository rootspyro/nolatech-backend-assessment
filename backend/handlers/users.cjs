/*
 * Users Handlers Module
 */

const userModel = require("../db/models/user.cjs")

async function GetUsers(req, res) {

  try {

    const response = await userModel.findAll({
      where: {
        status: "AVAILABLE" 
      }
    }) 
    const data = response.filter((user) => user.dataValues) 

    res.status(200).json({
      success: true,
      itemsFound: data.length,
      data 
    })

    return

  } catch(err) {

    console.log(err)

    res.status(500).json({
      success: false,
      data: "something went wrong"
    })

  }

}

async function GetSingleUser(req, res) {

  const id = req.param("id")

  try {
    
    const response = await userModel.findByPk(id, {}) 

    if (response == null) { // NOT FOUND

      res.status(404).json({
        success: false,
        data: "User not found"
      }) 

      return
    }

    const data = response.dataValues

    res.status(200).json({
      success: true,
      data
    })

  } catch(err) {

    console.log(err)

    response.status(500).json({
      success: false,
      data: "something went wrong!"
    })
  }
 }

module.exports = {
  GetUsers,
  GetSingleUser
}
