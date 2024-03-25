const express = require("express")
const appConf = require("../core/configuration.cjs")

// Main Router Object
const router = express.Router()

// API V.1 Paths
const routerV1 = express.Router()

routerV1.use("/auth", require("./auth.cjs"))
routerV1.use("/users", require("./user.cjs"))


// API VERSION ROUTE
router.use(`/${appConf.Api.Router.version}`, routerV1)

router.get("/health", (req, res) => {
  res.json({
    "status": "server is up!"
  })
})

// Add NOT_FOUND Path
router.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    data: `${req.method}:${req.path} path not found!`
  })
})


module.exports = router
