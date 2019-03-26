const express = require('express')
const bodyParser = require('body-parser')
const execSync = require('child_process').execSync;

const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const PORT = process.env.PORT || '6784'

app.get('/ping', (req, res) => {
  res.status(200).send("pong")
})
app.post('/', (req, res) => {
  const { payload } = req.body
  const data = JSON.parse(payload)
  console.log(data)
  if (data.tag === 'staging') {
    const output = execSync(`./src/trigger-travis.sh --branch master UniversityOfHelsinkiCS ToskaWatch ${process.env.TRAVIS_ACCESS_TOKEN} "Tests triggered by a webhook from ${repository}-${commit_id}"`, { encoding: 'utf-8' })
    console.log(output)
  }
  res.status(200).end()

})
app.post('/release', (req, res) => {
  //auth here req.headers["Authorization"]
  console.log(req.body)
  const output = execSync(`./src/release.sh ${process.env.TRAVIS_ACCESS_TOKEN} oodikone`, { encoding: 'utf-8' })
  res.status(200).send(output)
})

app.listen(PORT, () => console.log(`Running in port: ${PORT}`))