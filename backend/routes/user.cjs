const userRouter = require("express").Router()
const userHandler = require("../handlers/users/users.cjs")
const userValidator = require("../validators/users.cjs")

userRouter.get("/",
  (req, res, next) => userValidator.GetMethodUsersQueries(req, res, next),
  (req, res) => userHandler.GetUsers(req, res)
)

userRouter.get("/:id",
  (req, res, next) => userValidator.GetMethodSingleUser(req, res, next),
  (req, res) => userHandler.GetSingleUser(req, res)
)

userRouter.post("/",
  (req, res, next) => userValidator.PostMethodUserBody(req, res, next), 
  (req, res) => userHandler.CreateUser(req, res)
)

userRouter.patch("/:id",
  (req, res, next) => userValidator.PatchMethodUserBody(req, res, next), 
  (req, res) => userHandler.UpdateUser(req, res)
)

module.exports = userRouter
