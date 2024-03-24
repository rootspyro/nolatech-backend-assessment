const express = require("express")

// Main Router Object
const router = express.Router()

// API V.1 Paths
const routerV1 = express.Router()

routerV1.use("/auth", require("./auth.cjs"))
routerV1.use("/users", require("./user.cjs"))

routerV1.get("/health", (req, res) => {
  res.json({
    "status": "server is up!"
  })
})

// Add router V1 group
router.use("/v1", routerV1)

// Add NOT_FOUND Path
router.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    data: `${req.method}:${req.path} path not found!`
  })
})


module.exports = router
