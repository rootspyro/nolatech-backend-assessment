const app = require("./app.cjs")
const conf = require("./core/configuration.cjs")

const port = conf.App.port

app.listen(port, () => {
  console.log(`Listening on :${port}`)
})
