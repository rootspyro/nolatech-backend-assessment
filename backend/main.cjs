'use strict';

const express = require("express")
const app = express()

const port = 3000

app.use(express.json())
const router = require("./routes/router.cjs")

app.use("/v1", router)

app.get("*", (req, res) => {
  res.status(404)
  res.json({"status": "path not found"})
})

app.listen(port, () => {
  console.log("Listening on port :"+ port)
})
