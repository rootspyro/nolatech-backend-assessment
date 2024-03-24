/*
 *  Authentication Validator Module
 *  Middlewares to make validations of the authentication payload 
 */

const Responses = require("../core/responses.cjs")
const responseModule = new Responses()
const jwt = require("jsonwebtoken")

const rules = {  
  // username or email
  user: {
    field: "user",
    minLength: 3,
  },
  // plain text password
  password: {
    field: "password",
    minLength: 8,
  },
  authHeader: {
    field: "authorization"
  }
}

function PostMethodLogin(req, res, next) {
  
  const {
    user,
    password
  } = req.body

  if (!user) {

    responseModule.BODY_NOT_FOUND_FIELD(res, rules.user.field)
    return

  } else if (user.length < rules.user.minLength) {

    responseModule.BODY_FIELD_LENGTH_ERROR(res, rules.user.field, rules.user.minLength)
    return
  }

  if (!password) {

    responseModule.BODY_NOT_FOUND_FIELD(res, rules.password.field)
    return

  } else if (user.length < rules.password.minLength) {

    responseModule.BODY_FIELD_LENGTH_ERROR(res, rules.password.field, rules.password.minLength)
    return
  }
  next()
}

function ValidateBearerToken(req, res, next) {

  const headers = req.headers
  const bearerToken = headers["authorization"]

  if(bearerToken == undefined) {

    responseModule.Base(
      res,
      responseModule.statusBadRequest,
      false, 
      "header.authorization is required" 
    )

    return
  }

  try {

    decodedToken = jwt.verify(bearerToken, "temporalSecretKey")
    next()
    
  } catch(err) {
    responseModule.UNAUTHORAZED(res)
    return
  }
}

module.exports = {
  PostMethodLogin,
  ValidateBearerToken,
}
