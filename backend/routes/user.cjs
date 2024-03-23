const userRouter = require("express").Router()
const userHandler = require("../handlers/users.cjs")
const userVal = require("../validators/users.cjs")

userRouter.get("/", (req, res) => userHandler.GetUsers(req, res))
userRouter.get("/:id", (req, res) => userHandler.GetSingleUser(req, res))
userRouter.post("/",
  (req, res, next) => userVal.PostMethodUserBody(req, res, next), 
  (req, res) => userHandler.CreateUser(req, res)
)

module.exports = userRouter
