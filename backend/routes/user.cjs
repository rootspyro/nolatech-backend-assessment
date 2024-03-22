const userRouter = require("express").Router()

userRouter.get("/", (req, res) => {
  res.status(200)
  res.json({
    success: true,
    data: []
  })
})

userRouter.get("/:id", (req, res) => {
  res.status(200)
  res.json({
    success: true,
    data: {
      
    }
  })
})

module.exports = userRouter
