const express = require('express')
const bodyParser = require('body-parser')
const execSync = require('child_process').execSync;

const app = express()
app.use(bodyParser.urlencoded())

const PORT = process.env.PORT || '6784'

app.post('/', (req, res) => {
  const { payload } = req.body
  const data = JSON.parse(payload)
  console.log(data)
  const branch = data.ref.split('/')[2]
  if (branch === 'master') {
    const output = execSync(`./src/trigger-travis.sh UniversityOfHelsinkiCS ToskaWatch ${process.env.TRAVIS_ACCESS_TOKEN}`, { encoding: 'utf-8' })
    console.log(output)
  }

  res.status(200).end()
})

app.listen(PORT, () => console.log(`Running in port: ${PORT}`))