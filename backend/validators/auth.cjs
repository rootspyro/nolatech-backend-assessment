/*
 *  Authentication Validator Module
 *  Middlewares to make validations of the authentication payload 
 */

const Responses = require("../core/responses.cjs")
const responseModule = new Responses()

function ValidNumber(id) {
  const numId = Number(id)
  return Number.isInteger(numId) && numId > 0 
}

const rules = {  
  // username or email
  userId: {
    field: "id"
  },
  user: {
    field: "user",
    minLength: 3,
  },
  // plain text password
  password: {
    field: "password",
    minLength: 8,
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

  next()
}

module.exports = {
  PostMethodLogin,
}
