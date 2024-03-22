const express = require("express")
const router = express.Router()


router.get("/health", (req, res) => {
  res.json({
    "status": "server is up!"
  })
})


router.use("/users", require("./user.cjs"))

module.exports = router
