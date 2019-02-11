const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded())

const PORT  = process.env.PORT || '6784'

app.post('/', (req, res) => {
  const { payload } = req.body
  const data = JSON.parse(payload)
  console.log(data)
  res.status(200).end()
})

app.listen(PORT, () => console.log(`Running in port: ${PORT}`))