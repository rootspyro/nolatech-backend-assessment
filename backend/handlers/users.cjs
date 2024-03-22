/*
 * Users Handlers Module
 */

function GetUsers(req, res) {
  res.status(200)
  res.json({
    success: true,
    data: []
  })
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
