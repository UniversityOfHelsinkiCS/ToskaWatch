const cypress = require('cypress')
const axios = require('axios')

const status = {}
const SLACK_AT_FAILURE_COUNT = 2

const postToSlack = async (text = 'Toskawatch broke') => {
  if (!process.env.SLACK_HOOK) return

  try {
    await axios.post(process.env.SLACK_HOOK, { text })
  } catch (err) {
    console.log('Failed to send to slack:', err.message)
  }
}

const handleTestFailure = testIdentifier => {
  console.log(`FAIL ${testIdentifier} with ${status[testIdentifier]} failures`)
  if (!status[testIdentifier]) return (status[testIdentifier] = 1)
  const newStatus = ++status[testIdentifier]
  if (newStatus == SLACK_AT_FAILURE_COUNT) {
    postToSlack(`Noot noot! Toskawatch has failed twice in row for ${testIdentifier} :penguin:`)
  }
}

const handleTestSuccess = testIdentifier => {
  console.log(`SUCCESS ${testIdentifier} with ${status[testIdentifier]} failures`)
  if (status[testIdentifier] >= SLACK_AT_FAILURE_COUNT) {
    postToSlack(`Doot doot! ${newStatus} works! :penguin:`)
  }
  status[testIdentifier] = 0
}

const runTests = async spec => {
  const testStatus = await cypress.run({
    project: __dirname,
    spec
  })

  testStatus.runs.forEach(run => {
    if (run.stats.failures) {
      handleTestFailure(run.spec.name)
    } else {
      handleTestSuccess(run.spec.name)
    }
  })
}

const asyncWait = time => new Promise(resolve => setTimeout(() => resolve(), time))

const runPinger = async () => {
  try {
    await runTests(`${__dirname}/cypress/integration/grappa/production.js`)
    await asyncWait(10000)
    await runTests(`${__dirname}/cypress/integration/grappa/staging.js`)
    await asyncWait(10000)
    await runTests(`${__dirname}/cypress/integration/oodikone/production.js`)
    await asyncWait(10000)
    await runTests(`${__dirname}/cypress/integration/oodikone/staging.js`)
  } catch (e) {
    console.log('Failed to run tests', e)
    process.exit(1)
  }
}

module.exports = runPinger
