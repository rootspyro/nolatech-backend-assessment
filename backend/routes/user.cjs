const userRouter = require("express").Router()
const userHandler = require("../handlers/users.cjs")

userRouter.get("/", (req, res) => userHandler.GetUsers(req, res))
userRouter.get("/:id", (req, res) => userHandler.GetSingleUser(req, res))

module.exports = userRouter
