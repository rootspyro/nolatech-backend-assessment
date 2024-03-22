'use strict';

const express = require("express")
const app = express()

const port = 3000

app.get("/v1/health", (req, res) => {
  res.json({
    "status": "server is up!"
  })
})

app.listen(port, () => {
  console.log("Listening on port :"+ port)
})
