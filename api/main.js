const express = require('express')
const app = express()
const port = 4010
const client = require("../index.js")

app.get('/', (req, res) => {
  res.json({random: client.users.cache.random().tag})
})

app.listen(port, () => {
  console.log(`Api ligada com sucesso`)
})