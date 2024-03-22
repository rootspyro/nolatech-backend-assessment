/*
 * Users Handlers Module
 */

const userModel = require("../db/models/user.cjs")

async function GetUsers(req, res) {

  try {

    const response = await userModel.findAll() 
    const data = response.filter((user) => user.dataValues) 

    res.status(200).json({
      success: true,
      data 
    })

  } catch(err) {

    console.log(err)

    res.status(500).json({
      success: false,
      data: "something went wrong"
    })
  }

}

function GetSingleUser(req, res) {

  const id = req.param("id")
  
  const sampleResponse = {
    success: true,
    data: {
      id,
      username: ""
    }
  }

  res.status(200)
  res.json(sampleResponse)
}

module.exports = {
  GetUsers,
  GetSingleUser
}
