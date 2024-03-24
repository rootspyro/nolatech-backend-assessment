const authRouter = require("express").Router()
const authValidator = require("../validators/auth.cjs")
const authHandlers = require("../handlers/auth/auth.cjs")

authRouter.post("/login",
  (req, res, next) => authValidator.PostMethodLogin(req, res, next),
  (req, res) => authHandlers.UserLogin(req, res)
)


module.exports = authRouter
