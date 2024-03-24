/*
 *   Authentication Handlers Module
 */

const userModel = require("../../db/models/user.cjs")
const Responses = require("../../core/responses.cjs")  
const responseModule = new Responses()
const {Op} = require("sequelize")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

async function UserLogin(req, res) {

  const body = req.body

  try {

    const user = await userModel.findOne({
      where: {
        [Op.or]: [
          { username: body.user },
          { email: body.user }
        ] 
      }
    })

    if (user == null) {

      responseModule.NOT_FOUND(res)
      return
    }

    const userData = user.dataValues

    // validate password hash
    
    bcrypt.compare(body.password, userData.password).then(result => {

      if (!result) {
        responseModule.UNAUTHORAZED(res)
        return
      }

      // once the user credentials are validated create the token
      const token = jwt.sign({
        data: {
          user: userData.username,
          email: userData.email,
        }
      }, "temporalSecretKey", {expiresIn: "24h"})

      responseModule.OK(res, {
        token
      })

    }).catch(err => {
      console.log(err)
      responseModule.INTERNAL_SERVER_ERROR(res)
      return
    })

    return

  } catch(err) {
    responseModule.INTERNAL_SERVER_ERROR(res)
    return
  }

}

module.exports = {
  UserLogin
}
