/*
 *  Users Validator Module
 *  Middlewares to make validations of the users payload 
 */

const Responses = require("../core/responses.cjs")
const responseModule = new Responses()

const rules = {
  userId: {
    field: "id"
  },
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

function ValidNumber(id) {
  const numId = Number(id)
  return Number.isInteger(numId) && numId > 0 
}

function GetMethodUsersQueries(req, res, next) {

  const {
    page,
    count 
  }  = req.query

  if (page != undefined && !ValidNumber(page)) {
    responseModule.Base(
      res,
      responseModule.statusBadRequest,
      false,
      {
        id: "QUERIES_BAD_REQUEST",
        error: "invalid request.page value"
      } 
    )

    return
  }

  if (count != undefined && !ValidNumber(count)) {
    responseModule.Base(
      res,
      responseModule.statusBadRequest,
      false,
      {
        id: "QUERIES_BAD_REQUEST",
        error: "invalid request.count value"
      } 
    )

    return
  }

  next()
}

function GetMethodSingleUser(req, res, next) {

  const params = req.params
  const id = params.id

  if (!ValidNumber(id)) {
    responseModule.PARAMS_BAD_REQUEST(res, rules.userId.field)
    return
  }

  next()
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

function PatchMethodUserBody(req, res, next) {

  const {
    username,
    email,
    firstname,
    lastname
  } = req.body

  const params = req.params
  const id = params.id

  if (!ValidNumber(id)) {
    responseModule.PARAMS_BAD_REQUEST(res, rules.userId.field)
    return
  }

  if ( username == undefined && email == undefined && firstname == undefined && lastname == undefined) {
    responseModule.OK(res, { message: "nothing to do" })
    return
  }

  if (username != undefined && username.length < rules.username.minLength) {
    responseModule.BODY_FIELD_LENGTH_ERROR(res, rules.username.field, rules.username.minLength)
    return
  }

  if (email != undefined && email.length < rules.email.minLength) {
    responseModule.BODY_FIELD_LENGTH_ERROR(res, rules.email.field, rules.email.minLength)
    return
  }

  if (firstname != undefined && firstname.length < rules.firstname.minLength) {
    responseModule.BODY_FIELD_LENGTH_ERROR(res, rules.firstname.field, rules.firstname.minLength)
    return
  }

  if (lastname != undefined && lastname.length < rules.lastname.length) {
    responseModule.BODY_FIELD_LENGTH_ERROR(res, rules.lastname.field, rules.lastname.minLength)
    return
  }

  next()
}

module.exports = {
  GetMethodUsersQueries,
  GetMethodSingleUser,
  PostMethodUserBody,
  PatchMethodUserBody,
}
