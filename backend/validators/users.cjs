/*
 *  Name: Users Validator Module
 *  Description: middlewares to make validations of the users payload 
 */

const Responses = require("../core/responses.cjs")
const responseModule = new Responses()

const rules = {
  username: {
    field: "username",
    minLength: 3
  },
  email: {
    field: "email",
    minLength: 8 
  },
  firstname: {
    field: "firstname",
    minLength: 1
  },
  lastname: {
    field: "lastname",
    minLength: 2
  },
  password: {
    field: "password",
    minLength: 8
  },
  "status": {
    field: "status",
    minLength: 3
  }
}

function PostMethodUserBody(req, res, next) {

  const {
    username,
    email,
    firstname,
    lastname,
    password
  } = req.body

  if (!username) {

    responseModule.BODY_NOT_FOUND_FIELD(res, rules.username.field)
    return

  } else if (username.length < rules.username.minLength ) {

    responseModule.BODY_FIELD_LENGTH_ERROR(
      res,
      rules.username.field,
      rules.username.minLength
    )
    return
  }

  if (!email) {

    responseModule.BODY_NOT_FOUND_FIELD(res, rules.email.field)
    return

  } else if (email.length < rules.email.minLength ) {

    responseModule.BODY_FIELD_LENGTH_ERROR(
      res,
      rules.email.field,
      rules.email.minLength
    )
    return
  }

  if (!firstname) {

    responseModule.BODY_NOT_FOUND_FIELD(res, rules.firstname.field)
    return

  } else if (firstname.length < rules.firstname.minLength ) {

    responseModule.BODY_FIELD_LENGTH_ERROR(
      res,
      rules.firstname.field,
      rules.firstname.minLength
    )
    return
  }

  if (!lastname) {

    responseModule.BODY_NOT_FOUND_FIELD(res, rules.lastname.field)
    return

  } else if (lastname.length < rules.lastname.minLength ) {

    responseModule.BODY_FIELD_LENGTH_ERROR(
      res,
      rules.lastname.field,
      rules.lastname.minLength
    )
    return
  }

  if (!password) {

    responseModule.BODY_NOT_FOUND_FIELD(res, rules.password.field)
    return

  } else if (password.length < rules.password.minLength ) {

    responseModule.BODY_FIELD_LENGTH_ERROR(
      res,
      rules.password.field,
      rules.password.minLength
    )
    return
  }
  
  next()
}

module.exports = {
  PostMethodUserBody,
}
