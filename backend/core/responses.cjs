/*
 *   Name: RESPONSES MODULE
 *   Description: Module to keep a predefined structure of the API's responses.
 */

module.exports = class Responses {

  constructor() {
    // error predefined messages
    this.badRequestMsg = "request cannot be processed!"
    this.notFoundMsg = "item was not found!"
    this.serverErrMsg = "something went wrong!"

    // http status codes
    this.statusOk = 200
    this.statusCreated = 201
    this.statusBadRequest = 400
    this.statusNotFound = 404
    this.statusInternalServerErr = 500
  }

  Base(res, statusCode, success, data) {
    res.status(statusCode).json({
      success,
      data
    })
  }

  OK(res, data) { 
    this.Base(res, this.statusOk, true, data)
  }

  CREATED(res, data) { 
    this.Base(res, this.statusCreated, true, data)
  }

  BAD_REQUEST(res) { 
    this.Base(res, this.statusBadRequest, false, this.badRequestMsg)
  }

  NOT_FOUND(res) { 
    this.Base(res, this.statusNotFound, false, this.notFoundMsg)
  }

  INTERNAL_SERVER_ERROR(res) { 
    this.Base(res, this.statusInternalServerErr, false, this.serverErrMsg)
  }

}

