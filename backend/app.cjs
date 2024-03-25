'use strict';

const express = require("express")
const app = express(3000)

app.use(express.json())
const router = require("./routes/router.cjs")

app.use("/", router)

app.get("*", (req, res) => {
  res.status(404)
  res.json({"status": "path not found"})
})

module.exports = app
