'use strict';

const appConf = require("./core/configuration.cjs")

const express = require("express")
const app = express()

const port = appConf.App.port

app.use(express.json())
const router = require("./routes/router.cjs")

app.use("/", router)

app.get("*", (req, res) => {
  res.status(404)
  res.json({"status": "path not found"})
})

app.listen(port, () => {
  console.log("Listening on port :"+ port)
})
